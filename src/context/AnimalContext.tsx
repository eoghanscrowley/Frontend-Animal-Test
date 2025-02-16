import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Animal, AnimalType } from '../types/animal.types';

const initialAnimals: Animal[] = [];

interface AnimalContextType {
    animals: Animal[];
    addAnimal: (name: string, type: AnimalType) => void;
    playWithAnimal: (id: string) => void;
    feedAnimal: (id: string) => void;
    restAnimal: (id: string) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({ children }: { children: ReactNode }) {
    const [animals, setAnimals] = useState<Animal[]>(initialAnimals);

    // Add useEffect for periodic updates
    useEffect(() => {
        const timer = setInterval(() => {
            setAnimals(prev => prev.map(animal => ({
                ...animal,
                stats: {
                    ...animal.stats,
                    sleep: Math.min(100, animal.stats.sleep + 2),
                    happiness: Math.max(0, animal.stats.happiness - 2)
                }
            })));
        }, 10000); // Update every 10 seconds

        return () => clearInterval(timer);
    }, []);

    const addAnimal = (name: string, type: AnimalType) => {
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
    };

    const playWithAnimal = (id: string) => {
        setAnimals(prev => prev.map(animal => {
            if (animal.id === id) {
                return {
                    ...animal,
                    stats: {
                        ...animal.stats,
                        happiness: Math.min(100, animal.stats.happiness + 10)
                    }
                };
            }
            return animal;
        }));
    };

    const feedAnimal = (id: string) => {
        setAnimals(prev => prev.map(animal => {
            if (animal.id === id) {
                return {
                    ...animal,
                    stats: {
                        ...animal.stats,
                        hunger: Math.max(0, animal.stats.hunger - 10)
                    }
                };
            }
            return animal;
        }));
    };

    const restAnimal = (id: string) => {
        setAnimals(prev => prev.map(animal => {
            if (animal.id === id) {
                return {
                    ...animal,
                    stats: {
                        ...animal.stats,
                        sleep: Math.max(0, animal.stats.sleep - 10)
                    }
                };
            }
            return animal;
        }));
    };

    return (
        <AnimalContext.Provider value={{ 
            animals, 
            addAnimal, 
            playWithAnimal,
            feedAnimal,
            restAnimal
        }}>
            {children}
        </AnimalContext.Provider>
    );
}

export function useAnimalContext() {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error('useAnimalContext must be used within an AnimalProvider');
    }
    return context;
}