import { AnimalType } from "../types/animal.types";

/**
 * This constant defines the rate at which the stats of different animal types change.
 */
export const ANIMAL_RATE_CONFIGS: Record<AnimalType, {
    hungerRate: number;
    sleepRate: number;
    happinessRate: number;
}> = {
    poodle: {
        hungerRate: 1,
        sleepRate: 2,
        happinessRate: 1
    },
    beagle: {
        hungerRate: 3,
        sleepRate: 1,
        happinessRate: 2
    },
    dachshund: {
        hungerRate: 2,
        sleepRate: 2,
        happinessRate: 3
    }
};

/**
 * This constant defines the types of animals that can be added to the app.
 */
export const ALL_ANIMAL_TYPES = ['poodle', 'dachshund', 'beagle'] as const;
