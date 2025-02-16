export const ALL_ANIMAL_TYPES = ['poodle', 'dachshund', 'beagle'] as const;
export type AnimalType = typeof ALL_ANIMAL_TYPES[number];

export interface AnimalStats {
    happiness: number;
    hunger: number;
    sleep: number;
}

export interface Animal {
    id: string;
    name: string;
    type: AnimalType;
    stats: AnimalStats;
}

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