// Content for the PvZ teardown (/blog/pvz-deconstruction).
// Difficulty values are game-design estimates on a 0-100 index, not measured telemetry.
//   threat  : raw zombie pressure (count × HP × speed)
//   variety : how many distinct zombie types are in the spawn pool
//   skill   : player skill required (planning, micro, resource mgmt)
//   novelty : cognitive load from new mechanics introduced this level
//   economy : sun economy pressure (limited sun, no daytime sun, etc.)
// "overall" is a weighted blend, tuned so the curve has rest-and-relapse beats
// inside each world and a steep final-boss spike.

export type MetricKey = 'threat' | 'variety' | 'skill' | 'novelty' | 'economy';
export type LevelKind = 'intro' | 'standard' | 'conveyor' | 'bowling' | 'whack' | 'finale' | 'boss';

export interface World {
    id: string;
    name: string;
    lane: string;
    start: number;
    end: number;
}

export interface Level extends Record<MetricKey, number> {
    lvl: number;
    world: string;
    kind: LevelKind;
    title: string;
    unlock?: string;
    newZombie?: string;
    mechanic: string;
    note?: string;
    overall: number;
}

export const WORLDS: World[] = [
    { id: 'day', name: 'Day', lane: '5 lanes · grass', start: 1, end: 10 },
    { id: 'night', name: 'Night', lane: '5 lanes · no daytime sun', start: 11, end: 20 },
    { id: 'pool', name: 'Pool', lane: '6 lanes incl. water', start: 21, end: 30 },
    { id: 'fog', name: 'Fog', lane: '6 lanes · low visibility', start: 31, end: 40 },
    { id: 'roof', name: 'Roof', lane: '5 lanes · sloped, no soil', start: 41, end: 50 },
];

/* Muted, equal-chroma line colours; text that needs 4.5:1 uses ink instead */
export const METRICS: { key: MetricKey; label: string; color: string }[] = [
    { key: 'threat', label: 'Threat', color: '#A04C3A' },
    { key: 'variety', label: 'Variety', color: '#B07A2E' },
    { key: 'skill', label: 'Skill', color: '#3F6B58' },
    { key: 'novelty', label: 'Novelty', color: '#5A6A8A' },
    { key: 'economy', label: 'Economy', color: '#7A6A3A' },
];

export const WEIGHTS: Record<MetricKey, number> = { threat: 0.32, variety: 0.14, skill: 0.3, novelty: 0.1, economy: 0.14 };

type RawLevel = Omit<Level, 'overall'>;

const RAW_LEVELS: RawLevel[] = [
    // World 1 · Day
    { lvl: 1, world: 'day', kind: 'intro', title: 'First sprout', threat: 6, variety: 6, skill: 8, novelty: 55, economy: 30, unlock: 'Peashooter', newZombie: 'Browncoat', mechanic: 'Plant & sun basics', note: 'Single zombie, single lane. Onboarding only, teach the loop, not the fight.' },
    { lvl: 2, world: 'day', kind: 'standard', title: 'Two lanes', threat: 10, variety: 8, skill: 12, novelty: 35, economy: 32, unlock: 'Sunflower', mechanic: 'Sun economy', note: 'Introduce the economy plant before any real pressure arrives.' },
    { lvl: 3, world: 'day', kind: 'standard', title: 'Cherries on top', threat: 16, variety: 12, skill: 18, novelty: 30, economy: 36, unlock: 'Cherry Bomb', mechanic: 'Instant-use cooldown', note: 'First single-use AOE. Teach that some plants are commitments.' },
    { lvl: 4, world: 'day', kind: 'conveyor', title: 'Conveyor: Wall-nut bowling', threat: 14, variety: 10, skill: 22, novelty: 60, economy: 5, mechanic: 'Pre-set seeds on a belt', note: 'Difficulty drops on economy, spikes on novelty. Rest beat #1.' },
    { lvl: 5, world: 'day', kind: 'standard', title: 'Wall up', threat: 24, variety: 18, skill: 26, novelty: 25, economy: 40, unlock: 'Wall-nut', newZombie: 'Conehead', mechanic: 'Soak damage', note: 'First HP-tier zombie. Forces defensive layer.' },
    { lvl: 6, world: 'day', kind: 'standard', title: 'Snow line', threat: 30, variety: 24, skill: 30, novelty: 30, economy: 42, unlock: 'Snow Pea', mechanic: 'Slow on hit' },
    { lvl: 7, world: 'day', kind: 'standard', title: 'Chompers', threat: 34, variety: 28, skill: 34, novelty: 32, economy: 44, unlock: 'Chomper', mechanic: 'Chew downtime, punishable' },
    { lvl: 8, world: 'day', kind: 'standard', title: 'Repeater', threat: 38, variety: 30, skill: 36, novelty: 22, economy: 46, unlock: 'Repeater', mechanic: 'Double output, same lane' },
    { lvl: 9, world: 'day', kind: 'bowling', title: 'Bowling: lane 3 special', threat: 36, variety: 28, skill: 40, novelty: 45, economy: 8, mechanic: 'Pre-set bowling lane', note: 'Rest beat #2, economy off, accuracy on.' },
    { lvl: 10, world: 'day', kind: 'finale', title: 'Final wave: flag rush', threat: 54, variety: 38, skill: 46, novelty: 18, economy: 50, newZombie: 'Buckethead', mechanic: 'Final-wave huge spawn', note: 'Cap of world 1. First time players see a big wave.' },

    // World 2 · Night
    { lvl: 11, world: 'night', kind: 'intro', title: 'Night falls', threat: 32, variety: 30, skill: 42, novelty: 62, economy: 78, unlock: 'Puff-shroom', mechanic: 'Mushrooms · no daytime sun', note: 'Economy spikes hard, no sun from sky, sun-shroom is delayed.' },
    { lvl: 12, world: 'night', kind: 'standard', title: 'Sun-shroom', threat: 36, variety: 34, skill: 44, novelty: 38, economy: 72, unlock: 'Sun-shroom', mechanic: 'Growing economy plant' },
    { lvl: 13, world: 'night', kind: 'standard', title: 'Fume cloud', threat: 40, variety: 38, skill: 46, novelty: 34, economy: 68, unlock: 'Fume-shroom', newZombie: 'Pole-vaulter', mechanic: 'Pierces ranks · vault hops walls' },
    { lvl: 14, world: 'night', kind: 'conveyor', title: 'Conveyor: scaredy night', threat: 36, variety: 30, skill: 42, novelty: 48, economy: 6, mechanic: 'Belt seeds', note: 'Rest beat, but pole-vaulters punish weak placement.' },
    { lvl: 15, world: 'night', kind: 'standard', title: 'Grave digger', threat: 48, variety: 42, skill: 52, novelty: 44, economy: 60, newZombie: 'Newspaper / Screen-door', mechanic: 'Graves block placement', note: 'Map state changes. Forces grave-buster planning.' },
    { lvl: 16, world: 'night', kind: 'standard', title: 'Hypno', threat: 52, variety: 46, skill: 54, novelty: 36, economy: 58, unlock: 'Hypno-shroom', mechanic: 'Convert enemies' },
    { lvl: 17, world: 'night', kind: 'standard', title: 'Magnet', threat: 56, variety: 48, skill: 56, novelty: 34, economy: 56, unlock: 'Magnet-shroom', newZombie: 'Football', mechanic: 'Disarms metal threats' },
    { lvl: 18, world: 'night', kind: 'standard', title: 'Doom', threat: 60, variety: 50, skill: 58, novelty: 32, economy: 54, unlock: 'Doom-shroom', mechanic: 'Crater scars the lawn' },
    { lvl: 19, world: 'night', kind: 'whack', title: 'Whack-a-zombie', threat: 46, variety: 40, skill: 54, novelty: 55, economy: 10, mechanic: 'Reflex mini-game', note: 'Rest beat #2 of world 2.' },
    { lvl: 20, world: 'night', kind: 'finale', title: 'Final wave: graveyard rush', threat: 72, variety: 56, skill: 64, novelty: 22, economy: 62, newZombie: 'Dancing zombie', mechanic: 'Summoner, calls backup dancers', note: 'Summoner mechanic is the real test, not raw count.' },

    // World 3 · Pool
    { lvl: 21, world: 'pool', kind: 'intro', title: 'Two new lanes', threat: 54, variety: 50, skill: 60, novelty: 68, economy: 64, unlock: 'Lily Pad', newZombie: 'Ducky-tube', mechanic: 'Water lanes · pad required', note: 'Lane count jumps 5→6. Cognitive load on placement order.' },
    { lvl: 22, world: 'pool', kind: 'standard', title: 'Squash', threat: 60, variety: 54, skill: 62, novelty: 42, economy: 60, unlock: 'Squash', mechanic: 'One-shot any single zombie' },
    { lvl: 23, world: 'pool', kind: 'standard', title: 'Threepeater', threat: 62, variety: 56, skill: 64, novelty: 38, economy: 60, unlock: 'Threepeater', newZombie: 'Snorkel', mechanic: '3-lane fire · surfaces only to bite' },
    { lvl: 24, world: 'pool', kind: 'conveyor', title: 'Conveyor: tangle pool', threat: 54, variety: 46, skill: 58, novelty: 46, economy: 6, mechanic: 'Belt seeds', note: 'Rest beat.' },
    { lvl: 25, world: 'pool', kind: 'standard', title: 'Tangle kelp', threat: 64, variety: 60, skill: 66, novelty: 36, economy: 58, unlock: 'Tangle Kelp', newZombie: 'Zomboni', mechanic: 'Ice trail flattens plants, first persistent threat' },
    { lvl: 26, world: 'pool', kind: 'standard', title: 'Jalapeño', threat: 68, variety: 62, skill: 68, novelty: 34, economy: 58, unlock: 'Jalapeño', newZombie: 'Bobsled team', mechanic: 'Lane-clear AOE, counters ice trail' },
    { lvl: 27, world: 'pool', kind: 'standard', title: 'Spikeweed', threat: 70, variety: 64, skill: 68, novelty: 30, economy: 58, unlock: 'Spikeweed', mechanic: 'Ground-tier hit; pops vehicles' },
    { lvl: 28, world: 'pool', kind: 'standard', title: 'Torchwood', threat: 74, variety: 64, skill: 72, novelty: 32, economy: 58, unlock: 'Torchwood', newZombie: 'Dolphin rider', mechanic: 'Fire-buff pea path' },
    { lvl: 29, world: 'pool', kind: 'bowling', title: 'Bowling: pool edition', threat: 62, variety: 50, skill: 68, novelty: 42, economy: 8, mechanic: 'Bowling on 6 lanes', note: 'Rest beat, but two more lanes to track.' },
    { lvl: 30, world: 'pool', kind: 'finale', title: 'Final wave: tide turns', threat: 84, variety: 66, skill: 76, novelty: 24, economy: 64, newZombie: 'Jack-in-the-Box', mechanic: 'Random detonator inside the wave' },

    // World 4 · Fog
    { lvl: 31, world: 'fog', kind: 'intro', title: 'Into the fog', threat: 68, variety: 60, skill: 74, novelty: 70, economy: 66, unlock: 'Sea-shroom', mechanic: 'Fog hides spawn read', note: "You can't pre-read threats. Skill demand jumps." },
    { lvl: 32, world: 'fog', kind: 'standard', title: 'Plantern', threat: 72, variety: 62, skill: 74, novelty: 46, economy: 64, unlock: 'Plantern', mechanic: 'Clears fog tile' },
    { lvl: 33, world: 'fog', kind: 'standard', title: 'Cactus', threat: 74, variety: 64, skill: 76, novelty: 38, economy: 64, unlock: 'Cactus', newZombie: 'Balloon', mechanic: 'Air threat · cactus pops it' },
    { lvl: 34, world: 'fog', kind: 'conveyor', title: 'Conveyor: fog wall', threat: 64, variety: 56, skill: 70, novelty: 46, economy: 8, mechanic: 'Belt seeds in fog', note: 'Rest beat is shorter every world.' },
    { lvl: 35, world: 'fog', kind: 'standard', title: 'Blover', threat: 76, variety: 66, skill: 78, novelty: 36, economy: 62, unlock: 'Blover', newZombie: 'Digger', mechanic: 'Tunnels under defense' },
    { lvl: 36, world: 'fog', kind: 'standard', title: 'Split pea', threat: 80, variety: 66, skill: 80, novelty: 34, economy: 62, unlock: 'Split Pea', mechanic: 'Defends both directions' },
    { lvl: 37, world: 'fog', kind: 'standard', title: 'Starfruit', threat: 82, variety: 68, skill: 82, novelty: 34, economy: 60, unlock: 'Starfruit', newZombie: 'Pogo', mechanic: '5-way fire · one bounce ignores walls' },
    { lvl: 38, world: 'fog', kind: 'standard', title: 'Pumpkin', threat: 84, variety: 70, skill: 82, novelty: 30, economy: 60, unlock: 'Pumpkin', newZombie: 'Bungee', mechanic: 'Wraps a plant · steals from above' },
    { lvl: 39, world: 'fog', kind: 'whack', title: 'Bungee whack', threat: 70, variety: 58, skill: 80, novelty: 50, economy: 14, mechanic: 'Defend snatched plants', note: 'Rest beat, but reflex-gated.' },
    { lvl: 40, world: 'fog', kind: 'finale', title: 'Final wave: ladder zombies', threat: 90, variety: 74, skill: 86, novelty: 28, economy: 62, newZombie: 'Ladder', mechanic: 'Climbs walls, wallnut value drops' },

    // World 5 · Roof
    { lvl: 41, world: 'roof', kind: 'intro', title: 'On the roof', threat: 80, variety: 72, skill: 86, novelty: 78, economy: 74, unlock: 'Flower Pot', mechanic: 'No soil · sloped lanes', note: 'Slope breaks all straight-shot intuition. Hard reset.' },
    { lvl: 42, world: 'roof', kind: 'standard', title: 'Cabbage', threat: 84, variety: 74, skill: 86, novelty: 46, economy: 70, unlock: 'Cabbage-pult', mechanic: 'Arc shot, only roof attacker', note: 'All flat-shooters obsolete here.' },
    { lvl: 43, world: 'roof', kind: 'standard', title: 'Kernel', threat: 86, variety: 76, skill: 86, novelty: 38, economy: 70, unlock: 'Kernel-pult', newZombie: 'Catapult', mechanic: 'Butter stun · 25% chance' },
    { lvl: 44, world: 'roof', kind: 'conveyor', title: 'Conveyor: butter roof', threat: 74, variety: 64, skill: 82, novelty: 46, economy: 10, mechanic: 'Pult-only belt', note: 'Last rest beat of the game.' },
    { lvl: 45, world: 'roof', kind: 'standard', title: 'Coffee bean', threat: 88, variety: 78, skill: 88, novelty: 34, economy: 68, unlock: 'Coffee Bean', newZombie: 'Gargantuar (preview)', mechanic: 'Wakes night mushrooms in daytime' },
    { lvl: 46, world: 'roof', kind: 'standard', title: 'Garlic', threat: 90, variety: 80, skill: 88, novelty: 32, economy: 68, unlock: 'Garlic', mechanic: 'Diverts zombies to other lanes' },
    { lvl: 47, world: 'roof', kind: 'standard', title: 'Umbrella', threat: 92, variety: 80, skill: 90, novelty: 32, economy: 66, unlock: 'Umbrella Leaf', newZombie: 'Gargantuar', mechanic: 'Tank that throws Imp · two-stage threat' },
    { lvl: 48, world: 'roof', kind: 'standard', title: 'Marigold + Melon', threat: 94, variety: 82, skill: 92, novelty: 30, economy: 66, unlock: 'Melon-pult', mechanic: 'Splash arc, endgame DPS' },
    { lvl: 49, world: 'roof', kind: 'standard', title: 'Gatling + Twin', threat: 96, variety: 82, skill: 94, novelty: 28, economy: 66, unlock: 'Gatling Pea / Twin Sunflower', mechanic: 'Stacked plant upgrade tier' },
    { lvl: 50, world: 'roof', kind: 'boss', title: 'Boss · Zomboss', threat: 100, variety: 88, skill: 100, novelty: 74, economy: 78, newZombie: 'Zomboss', mechanic: 'Scripted boss · multi-phase', note: 'Difficulty SPIKE, novelty back up because the rules change.' },
];

export const LEVELS: Level[] = RAW_LEVELS.map((l) => ({
    ...l,
    overall: METRICS.reduce((sum, m) => sum + l[m.key] * WEIGHTS[m.key], 0),
}));

export const REST_KINDS: LevelKind[] = ['conveyor', 'bowling', 'whack'];

export const KIND_LABEL: Record<LevelKind, string> = {
    intro: 'world intro',
    standard: 'standard',
    conveyor: 'rest · conveyor',
    bowling: 'rest · bowling',
    whack: 'rest · whack-a-zombie',
    finale: 'finale wave',
    boss: 'boss',
};

export const ANNOTATIONS = [
    { lvl: 5, text: ['First HP-tier zombie', '(Conehead)'] },
    { lvl: 11, text: ['World reset, sun economy collapses'] },
    { lvl: 20, text: ['Summoner mechanic', 'changes threat model'] },
    { lvl: 21, text: ['Lane count 5 → 6', '(water lanes)'] },
    { lvl: 31, text: ['Fog: spawn-read removed'] },
    { lvl: 41, text: ['Slope breaks straight-shooters', '- hard reset'] },
    { lvl: 50, text: ['Boss · scripted multi-phase'] },
];

export const RATIONALE = [
    { h: 'Sawtooth, not slope.', body: 'Inside each world we plant 2–3 rest beats (conveyor, bowling, whack) where economy turns off and novelty turns on. Players exhale, learn one isolated thing, then return to the ramp.' },
    { h: 'World boundaries are structural.', body: 'A new world changes the board, not just the bestiary, fewer or more lanes, no sun, fog, slope. This re-skills the player and lets us reset overall difficulty down while novelty spikes.' },
    { h: 'Final waves are population, not invention.', body: 'The cap of each world reuses everything taught so far at higher spawn density. The mechanic load is low; the execution load is high.' },
    { h: 'Boss is its own ruleset.', body: 'Level 50 spikes novelty again because the play pattern changes. We earn the spike by flattening novelty across levels 45–49.' },
    { h: 'Plant unlocks lead threat by ~1 level.', body: 'Counters ship the level before the threat they counter, so the new tool feels chosen, not handed out under duress.' },
];

export const PILLARS = [
    { n: '01', title: 'Teach by doing, not by telling', body: 'Almost every tutorial prompt is immediately followed by a chance to act. Instructions are confirmed through play, not reading.', tag: 'low friction' },
    { n: '02', title: 'Introduce → Challenge → Reward', body: "Every mechanic is shown safely, then tested under pressure, then rewarded with a tool that extends the player's options.", tag: 'ICAR' },
    { n: '03', title: 'Controlled information density', body: 'Early levels restrict the choices on offer. One row, one plant. This is a design decision, not a limitation, it lets one mechanic land before the next arrives.', tag: 'cognitive load' },
    { n: '04', title: 'Pacing as narrative', body: 'Difficulty does not climb monotonically. Wave-and-rest rhythm produces emotional investment, players feel relief, not just pressure.', tag: 'rhythm' },
];

export const ICAR_STAGES = [
    { k: 'I', label: 'Introduce', body: 'Show the mechanic in a safe context. Low stakes, low population.', ex: 'Lv 2 · sunflower placed before any zombie pressure' },
    { k: 'C', label: 'Challenge', body: 'Test the mechanic under load. Player must apply it to survive.', ex: 'Lv 3 · conehead forces a wall-nut or doubled-up peashooters' },
    { k: 'A', label: 'Adapt', body: 'Player tunes execution: timing, placement, resource trade-offs.', ex: 'Lv 5–9 · same enemies, denser waves, tighter sun' },
    { k: 'R', label: 'Reward', body: 'Hand back a tool that expands the strategic surface for the next loop.', ex: 'End of world · new plant + new zombie preview' },
];

export const TUTORIAL = [
    { lvl: '1-1', title: 'The Safe Room', state: 'isolate the core loop', intro: 'One lane, one plant, one zombie. Sun collection.', challenge: 'Zombies are shown walking before the player places anything, stakes-before-solution.', reward: 'Sunflower seed (the economy plant).', insight: 'Show the threat before you teach the solution.' },
    { lvl: '1-2', title: 'Expanding the Field', state: 'feel powerful, not pressured', intro: 'Three lanes open. First spatial decision: where sunflowers go vs. where defense goes.', challenge: 'Progress bar appears, first time the wave structure is legible to the player.', reward: 'Cherry Bomb, first AOE / commitment cooldown.', insight: 'Give players more space before you give them more enemies.' },
    { lvl: '1-3', title: 'Introducing Variance', state: 'observe, then adapt', intro: 'Conehead zombie appears. No tooltip, taught by visual contrast against the basic zombie.', challenge: 'Final wave forces use of the new AOE tool against a tankier threat.', reward: 'Wall-nut, introduces tanking and the idea of buying time instead of dealing damage.', insight: 'Variants taught by contrast feel discovered. Variants taught by stat screens feel instructed.' },
    { lvl: '1-4', title: 'Freedom with Structure', state: 'full agency · safety net', intro: 'Full grid opens. Tutorial scaffolding is removed.', challenge: 'Manage resources, space, threat, simultaneously, unscaffolded.', reward: 'Shovel, an undo tool. Implicit message: mistakes are reversible.', insight: "Give players an 'undo' when removing training wheels. Anxiety drops, experimentation rises." },
    { lvl: '1-5', title: 'Mini-game Breather', state: 'rest · consolidate', intro: 'Pre-set seeds on a belt. Economy turns off entirely.', challenge: 'Low, by design. Tests placement skill in isolation.', reward: 'Re-centers the player before the local ramp resumes at 1-6.', insight: 'A rest beat is not filler. It is when the player consolidates everything they just learned.' },
];

export const WORLD_MATRIX = [
    { w: 'Day', removes: 'nothing', adds: 'the core grid', reuses: '-', shift: 'learn the loop', tools: 'Peashooter, Sunflower, Cherry, Wall-nut' },
    { w: 'Night', removes: 'passive daytime sun', adds: 'mushroom roster · graves', reuses: 'same 5-lane grid', shift: 'resource layer rewritten', tools: 'Sun-shroom, Puff, Fume, Hypno, Doom' },
    { w: 'Pool', removes: '-', adds: 'two water lanes · aquatic-only plants', reuses: 'daytime sun returns', shift: 'spatial dimension expands', tools: 'Lily Pad, Squash, Threepeater, Tangle Kelp' },
    { w: 'Fog', removes: 'visibility', adds: 'information as a resource', reuses: 'same 6-lane pool grid', shift: 'read-ahead removed', tools: 'Plantern, Cactus, Blover, Starfruit, Pumpkin' },
    { w: 'Roof', removes: 'soil · straight shots', adds: 'arc physics · slope', reuses: 'all plants conceptually', shift: 'projectile model rewritten', tools: 'Flower Pot, Cabbage-pult, Kernel-pult, Melon-pult' },
];

export const TAKEAWAYS = [
    { n: '01', h: 'The ICAR loop scales', body: 'Apply Introduce → Challenge → Adapt → Reward at the level scale and the world scale. Both rhythms should fire, micro tension over ~3 minutes, macro tension over ~45.' },
    { n: '02', h: 'Pacing is the product', body: "Players don't only play for challenge; they play for the emotional rhythm of tension and relief. A difficulty curve is an emotional curve in disguise." },
    { n: '03', h: 'Reuse and recontextualize', body: 'Change a constraint on a familiar system instead of inventing a new one. Cheaper to build, easier to learn, and content efficiency is a feature.' },
    { n: '04', h: 'Error correction reduces churn', body: 'The shovel is a free undo. In F2P, letting players recover from mistakes without spending premium currency builds trust and keeps early-funnel players in the game.' },
];
