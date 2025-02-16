import { useEffect } from "react";
import { render } from "@testing-library/react";
import { mock } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { AnimalProvider } from "../context/AnimalContext";
import { useAnimalContext } from "../context/AnimalContext";
import { Animal } from "../types/animal.types";

/**
 * A component that allows us to test the AnimalContext.
 * 
 * @param onAnimalsChange - A function that will be called with the current list of animals.
 * @returns null
 */
export function TestContextConsumer(
    { onAnimalsChange }: { onAnimalsChange: (animals: Animal[]) => void }
) {
    const { animals } = useAnimalContext();

    useEffect(() => {
        onAnimalsChange(animals);
    }, [animals, onAnimalsChange]);

    return null;
}


export const renderWithProvider = (component: React.ReactNode) => {
    const animalsCallback = mock((animals: Animal[]) => animals);

    render(
        <AnimalProvider>
            {component}
            <TestContextConsumer onAnimalsChange={animalsCallback} />
        </AnimalProvider>
    );

    return { animalsCallback };
}
