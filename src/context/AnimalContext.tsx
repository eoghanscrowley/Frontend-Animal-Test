import { createContext, useContext, useState, ReactNode } from 'react';
import { Animal } from '../types/animal.types';

const initialAnimals: Animal[] = [
    {
        id: crypto.randomUUID(),
        name: "Stefan",
        stats: {
            happiness: 80,
            hunger: 60,
            sleep: 50,
        },
    },
];

interface AnimalContextType {
    animals: Animal[];
    addAnimal: (name: string) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({ children }: { children: ReactNode }) {
    const [animals, setAnimals] = useState<Animal[]>(initialAnimals);

    const addAnimal = (name: string) => {
        const newAnimal: Animal = {
            id: crypto.randomUUID(),
            name,
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