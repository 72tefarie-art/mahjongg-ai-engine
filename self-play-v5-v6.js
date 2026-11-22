/**
 * v5/v6 Headless Self-Play & Behavioral Persona Generator
 * Decouples rules evaluation from DOM rendering to generate .jsonl training tuples.
 */

const fs = require('fs');

// v6 Behavioral Bot Personas to prevent self-play mode collapse
const BOT_PERSONAS = {
  AGGRESSIVE_CALLER: {
    id: 'aggressive_caller',
    claimThreshold: 2,     // Calls exposures early (within 2 tiles of Mah Jongg)
    jokerHoldWeight: 0.7,  // Willing to expose Jokers early for speed
    defensiveWeight: 0.2   // Prioritizes own hand velocity over blocking opponents
  },
  DEFENSIVE_HOARDER: {
    id: 'defensive_hoarder',
    claimThreshold: 1,     // Keeps hand concealed unless 1 away from winning
    jokerHoldWeight: 1.5,  // Hoards Jokers for concealed hands
    defensiveWeight: 1.8   // Holds back tiles matching opponent exposures
  },
  RUN_SPECIALIST: {
    id: 'run_specialist',
    claimThreshold: 2,
    jokerHoldWeight: 1.1,
    defensiveWeight: 0.9,
    preferredFamily: 'CONSECUTIVE_RUN' // Biases utility scoring toward sequential runs
  }
};

class HeadlessSelfPlaySimulator {
  constructor(rulesEngine, patternVectors) {
    this.rules = rulesEngine;
    this.patterns = patternVectors;
  }

  encodeStateVector(seatState, visibleDiscards, exposures, turnNumber) {
    return {
      turn: turnNumber,
      concealedCounts: seatState.handHistogram, // Array[34] tile counts
      visibleRiver: visibleDiscards,            // Array[34] dead/discarded tile counts
      exposedCount: exposures.length,
      minPatternDistance: seatState.minDistance,
      jokerCount: seatState.handHistogram[33] || 0
    };
  }

  selectDiscard(seatState, visibleDiscards, exposures, persona) {
    const legalDiscards = this.rules.getLegalDiscards(seatState.hand);
    let bestTile = legalDiscards[0];
    let lowestUtility = Infinity;

    for (const tile of legalDiscards) {
      let utility = this.rules.evaluateTileUtility(tile, seatState.hand, this.patterns);

      if (tile === 'JOKER') utility *= persona.jokerHoldWeight;
      if (persona.preferredFamily && this.rules.isFamilyTile(tile, persona.preferredFamily)) {
        utility *= 1.35;
      }

      const dangerScore = this.rules.estimateDealInRisk(tile, exposures, visibleDiscards);
      utility += dangerScore * persona.defensiveWeight;

      if (utility < lowestUtility) {
        lowestUtility = utility;
        bestTile = tile;
      }
    }
    return { tile: bestTile, utility: lowestUtility };
  }

  simulateGame(gameId) {
    const personaKeys = Object.keys(BOT_PERSONAS);
    const seats = [0, 1, 2, 3].map(seatIdx => ({
      seat: seatIdx,
      persona: BOT_PERSONAS[personaKeys[(gameId + seatIdx) % personaKeys.length]],
      hand: [],
      exposures: []
    }));

    let wall = this.rules.createShuffledWall();
    this.rules.dealInitialHands(seats, wall);

    const trajectoryBuffer = [];
    const visibleDiscards = new Array(34).fill(0);
    let winnerSeat = -1;
    let turn = 0;

    while (wall.length > 0 && winnerSeat === -1 && turn < 80) {
      const activeSeat = seats[turn % 4];
      const drawnTile = wall.pop();
      activeSeat.hand.push(drawnTile);

      if (this.rules.checkMahJongg(activeSeat.hand, activeSeat.exposures, this.patterns)) {
        winnerSeat = activeSeat.seat;
        break;
      }

      const stateFeatures = this.encodeStateVector(
        this.rules.summarizeSeat(activeSeat, this.patterns),
        [...visibleDiscards],
        activeSeat.exposures,
        turn
      );

      const decision = this.selectDiscard(
        activeSeat,
        visibleDiscards,
        seats.flatMap(s => s.exposures),
        activeSeat.persona
      );

      this.rules.removeTile(activeSeat.hand, decision.tile);
      const tileIdx = this.rules.tileToIndex(decision.tile);
      if (tileIdx >= 0) visibleDiscards[tileIdx]++;

      trajectoryBuffer.push({
        game_id: `sim_${gameId}`,
        turn,
        seat: activeSeat.seat,
        persona: activeSeat.persona.id,
        state: stateFeatures,
        action: { type: 'DISCARD', tile: decision.tile, tile_idx: tileIdx },
        outcome: { won_hand: 0, dealt_in: 0, final_distance: 0 }
      });

      turn++;
    }

    const lastStep = trajectoryBuffer[trajectoryBuffer.length - 1];
    return trajectoryBuffer.map(step => ({
      ...step,
      outcome: {
        won_hand: step.seat === winnerSeat ? 1 : 0,
        dealt_in: (winnerSeat !== -1 && lastStep && step === lastStep && step.seat !== winnerSeat) ? 1 : 0,
        turns_remaining: turn - step.turn
      }
    }));
  }

  generateDataset(numGames = 10000, outputPath = './v6_selfplay_dataset.jsonl') {
    const stream = fs.createWriteStream(outputPath, { flags: 'w' });
    let totalTuples = 0;

    for (let g = 0; g < numGames; g++) {
      const records = this.simulateGame(g);
      for (const rec of records) {
        stream.write(JSON.stringify(rec) + '\n');
        totalTuples++;
      }
    }
    stream.end();
    console.log(`[v6 Data Factory] Generated ${numGames} games (${totalTuples} labeled tuples) -> ${outputPath}`);
  }
}

module.exports = { HeadlessSelfPlaySimulator, BOT_PERSONAS };