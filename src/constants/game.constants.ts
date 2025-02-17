export const GAME_CONSTANTS = {
    TICK_INTERVAL: 1000,
    DEFAULT_STAT_VALUE: 50,
    MAX_STAT_VALUE: 100,
    MIN_STAT_VALUE: 0,
    STAT_INCREMENT: 10,
    CRITICAL_STAT_THRESHOLD: 80,
    STAT_MULTIPLIER: 2
} as const; 

/**
 * This constant defines the types of animals that can be added to the app.
 */
export const ALL_ANIMAL_TYPES = ['poodle', 'dachshund', 'beagle'] as const;
