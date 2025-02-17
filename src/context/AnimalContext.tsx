import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

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

/**
 * This component provides the AnimalContext to its children.
 * It manages the state of the animals and provides functions to interact with them.
 */
export function AnimalProvider({ children }: { children: ReactNode }) {
    const [animals, setAnimals] = useState<Animal[]>(initialAnimals);

    const updateAnimalStats = useCallback((
        id: string,
        updateFn: (stats: Animal['stats']) => Partial<Animal['stats']>
    ) => {
        setAnimals(prev => prev.map(animal => {
            if (animal.id === id) {
                return {
                    ...animal,
                    stats: {
                        ...animal.stats,
                        ...updateFn(animal.stats)
                    }
                };
            }
            return animal;
        }));
    }, []);

    // Add useEffect for periodic updates
    useEffect(() => {
        const timer = setInterval(() => {
            setAnimals(prev => prev.map(animal => {
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
            }));
        }, GAME_CONSTANTS.TICK_INTERVAL);

        return () => clearInterval(timer);
    }, []);

    const addAnimal = useCallback((name: string, type: AnimalType) => {
        const newAnimal: Animal = {
            id: crypto.randomUUID(),
            name,
            type,
            stats: {
                happiness: GAME_CONSTANTS.DEFAULT_STAT_VALUE,
                hunger: GAME_CONSTANTS.DEFAULT_STAT_VALUE,
                sleep: GAME_CONSTANTS.DEFAULT_STAT_VALUE,
            },
        };
        setAnimals(prev => [...prev, newAnimal]);
    }, []);

    const playWithAnimal = useCallback((id: string) => {
        updateAnimalStats(id, (stats) => ({
            happiness: Math.min(
                GAME_CONSTANTS.MAX_STAT_VALUE,
                stats.happiness + GAME_CONSTANTS.STAT_INCREMENT
            )
        }));
    }, [updateAnimalStats]);

    const feedAnimal = useCallback((id: string) => {
        updateAnimalStats(id, (stats) => ({
            hunger: Math.max(
                GAME_CONSTANTS.MIN_STAT_VALUE,
                stats.hunger - GAME_CONSTANTS.STAT_INCREMENT
            )
        }));
    }, [updateAnimalStats]);

    const restAnimal = useCallback((id: string) => {
        updateAnimalStats(id, (stats) => ({
            sleep: Math.max(
                GAME_CONSTANTS.MIN_STAT_VALUE,
                stats.sleep - GAME_CONSTANTS.STAT_INCREMENT
            )
        }));
    }, [updateAnimalStats]);

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