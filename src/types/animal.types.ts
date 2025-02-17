import { ALL_ANIMAL_TYPES } from "../constants/animal.constants";

/**
 * This type defines the types of animals that can be added to the app.
 */
export type AnimalType = typeof ALL_ANIMAL_TYPES[number];

/**
 * This interface defines the stats of an animal.
 */
export interface AnimalStats {
    happiness: number;
    hunger: number;
    sleep: number;
}

/**
 * This interface defines the properties of an animal.
 */
export interface Animal {
    id: string;
    name: string;
    type: AnimalType;
    stats: AnimalStats;
}