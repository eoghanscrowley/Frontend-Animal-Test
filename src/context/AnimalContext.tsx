import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

import { Animal, AnimalType } from '../types/animal.types';
import { ANIMAL_RATE_CONFIGS } from '../constants/animal.constants';
import { GAME_CONSTANTS } from '../constants/game.constants';
const initialAnimals: Animal[] = [];

/**
 * This interface defines the types of the values that the AnimalContext can provide.
 */
interface AnimalContextType {
    animals: Animal[];
    addAnimal: (name: string, type: AnimalType) => void;
    playWithAnimal: (id: string) => void;
    feedAnimal: (id: string) => void;
    restAnimal: (id: string) => void;
}

const AnimalContext = createContext<AnimalContextType | null>(null);

// Add new types for actions
type AnimalAction = 
  | { type: 'ADD_ANIMAL'; payload: { name: string; type: AnimalType } }
  | { type: 'PLAY_WITH_ANIMAL'; payload: { id: string } }
  | { type: 'FEED_ANIMAL'; payload: { id: string } }
  | { type: 'REST_ANIMAL'; payload: { id: string } }
  | { type: 'UPDATE_STATS' };

// Add reducer function
function animalReducer(state: Animal[], action: AnimalAction): Animal[] {
    let newAnimal: Animal;
    switch (action.type) {
        case 'ADD_ANIMAL':
            newAnimal = {
                id: crypto.randomUUID(),
                name: action.payload.name,
                type: action.payload.type,
                stats: {
                    happiness: GAME_CONSTANTS.DEFAULT_STAT_VALUE,
                    hunger: GAME_CONSTANTS.DEFAULT_STAT_VALUE,
                    sleep: GAME_CONSTANTS.DEFAULT_STAT_VALUE,
                },
            };
            return [...state, newAnimal];

        case 'UPDATE_STATS':
            return state.map(animal => {
                const rates = ANIMAL_RATE_CONFIGS[animal.type];
                const increasedRateCondition = (
                    animal.stats.hunger >= GAME_CONSTANTS.CRITICAL_STAT_THRESHOLD ||
                    animal.stats.sleep >= GAME_CONSTANTS.CRITICAL_STAT_THRESHOLD
                );
                const happinessDecrease = increasedRateCondition 
                    ? rates.happinessRate * GAME_CONSTANTS.STAT_MULTIPLIER
                    : rates.happinessRate;
                
                return {
                    ...animal,
                    stats: {
                        ...animal.stats,
                        sleep: Math.min(
                            GAME_CONSTANTS.MAX_STAT_VALUE,
                            animal.stats.sleep + rates.sleepRate
                        ),
                        happiness: Math.max(
                            GAME_CONSTANTS.MIN_STAT_VALUE,
                            animal.stats.happiness - happinessDecrease
                        ),
                        hunger: Math.min(
                            GAME_CONSTANTS.MAX_STAT_VALUE,
                            animal.stats.hunger + rates.hungerRate
                        )
                    }
                };
            });

        case 'PLAY_WITH_ANIMAL':
            return state.map(animal => 
                animal.id === action.payload.id
                    ? {
                        ...animal,
                        stats: {
                            ...animal.stats,
                            happiness: Math.min(
                                GAME_CONSTANTS.MAX_STAT_VALUE,
                                animal.stats.happiness + GAME_CONSTANTS.STAT_INCREMENT
                            )
                        }
                    }
                    : animal
            );

        case 'FEED_ANIMAL':
            return state.map(animal =>
                animal.id === action.payload.id
                    ? {
                        ...animal,
                        stats: {
                            ...animal.stats,
                            hunger: Math.max(
                                GAME_CONSTANTS.MIN_STAT_VALUE,
                                animal.stats.hunger - GAME_CONSTANTS.STAT_INCREMENT
                            )
                        }
                    }
                    : animal
            );

        case 'REST_ANIMAL':
            return state.map(animal =>
                animal.id === action.payload.id
                    ? {
                        ...animal,
                        stats: {
                            ...animal.stats,
                            sleep: Math.max(
                                GAME_CONSTANTS.MIN_STAT_VALUE,
                                animal.stats.sleep - GAME_CONSTANTS.STAT_INCREMENT
                            )
                        }
                    }
                    : animal
            );

        default:
            return state;
    }
}

/**
 * This component provides the AnimalContext to its children.
 * It manages the state of the animals and provides functions to interact with them.
 */
export function AnimalProvider({ children }: { children: ReactNode }) {
    const [animals, dispatch] = useReducer(animalReducer, initialAnimals);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'UPDATE_STATS' });
        }, GAME_CONSTANTS.TICK_INTERVAL);

        return () => clearInterval(timer);
    }, []);

    const addAnimal = (name: string, type: AnimalType) => {
        dispatch({ type: 'ADD_ANIMAL', payload: { name, type } });
    };

    const playWithAnimal = (id: string) => {
        dispatch({ type: 'PLAY_WITH_ANIMAL', payload: { id } });
    };

    const feedAnimal = (id: string) => {
        dispatch({ type: 'FEED_ANIMAL', payload: { id } });
    };

    const restAnimal = (id: string) => {
        dispatch({ type: 'REST_ANIMAL', payload: { id } });
    };

    const value = {
        animals,
        addAnimal,
        playWithAnimal,
        feedAnimal,
        restAnimal
    };

    return (
        <AnimalContext.Provider value={value}>
            {children}
        </AnimalContext.Provider>
    );
}

/**
 * This hook allows other components to access the AnimalContext.
 */
export function useAnimalContext() {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error('useAnimalContext must be used within an AnimalProvider');
    }
    return context;
}