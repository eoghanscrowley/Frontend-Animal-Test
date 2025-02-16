import { useEffect } from "react";
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
