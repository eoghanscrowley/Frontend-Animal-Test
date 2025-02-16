
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