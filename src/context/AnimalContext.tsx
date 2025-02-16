import { createContext, useContext, useState, ReactNode } from 'react';
import { Animal, AnimalType } from '../types/animal.types';

const initialAnimals: Animal[] = [];

interface AnimalContextType {
    animals: Animal[];
    addAnimal: (name: string, type: AnimalType) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({ children }: { children: ReactNode }) {
    const [animals, setAnimals] = useState<Animal[]>(initialAnimals);

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

    return (
        <AnimalContext.Provider value={{ animals, addAnimal }}>
            {children}
        </AnimalContext.Provider>
    )
}

export function useAnimalContext() {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error('useAnimalContext must be used within an AnimalProvider');
    }
    return context;
}