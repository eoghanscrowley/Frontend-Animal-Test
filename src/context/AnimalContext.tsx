import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Animal, AnimalType, ANIMAL_RATE_CONFIGS } from '../types/animal.types';

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
                const happinessDecrease = (animal.stats.hunger >= 80 || animal.stats.sleep >= 80) 
                    ? rates.happinessRate * 2 
                    : rates.happinessRate;
                
                return {
                    ...animal,
                    stats: {
                        ...animal.stats,
                        sleep: Math.min(100, animal.stats.sleep + rates.sleepRate),
                        happiness: Math.max(0, animal.stats.happiness - happinessDecrease),
                        hunger: Math.min(100, animal.stats.hunger + rates.hungerRate)
                    }
                };
            }));
        }, 10000); // Update every 10 seconds

        return () => clearInterval(timer);
    }, []);

    const addAnimal = useCallback((name: string, type: AnimalType) => {
        const newAnimal: Animal = {
            id: crypto.randomUUID(),
            name,
            type,
            stats: {
                happiness: 50,
                hunger: 50,
                sleep: 50,
            },
        };
        setAnimals(prev => [...prev, newAnimal]);
    }, []);

    const playWithAnimal = useCallback((id: string) => {
        updateAnimalStats(id, (stats) => ({
            happiness: Math.min(100, stats.happiness + 10)
        }));
    }, [updateAnimalStats]);

    const feedAnimal = useCallback((id: string) => {
        updateAnimalStats(id, (stats) => ({
            hunger: Math.max(0, stats.hunger - 10)
        }));
    }, [updateAnimalStats]);

    const restAnimal = useCallback((id: string) => {
        updateAnimalStats(id, (stats) => ({
            sleep: Math.max(0, stats.sleep - 10)
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