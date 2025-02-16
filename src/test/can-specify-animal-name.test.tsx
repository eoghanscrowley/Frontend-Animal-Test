import { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, mock } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";
import { useAnimalContext, AnimalProvider } from "../context/AnimalContext";

import { Animal } from "../types/animal.types";


/**
 * A component that allows us to test the AnimalContext.
 * 
 * @param onAnimalsChange - A function that will be called with the current list of animals.
 * @returns null
 */
function TestContextConsumer(
    { onAnimalsChange }: { onAnimalsChange: (animals: Animal[]) => void }
) {
    const { animals } = useAnimalContext();

    useEffect(() => {
        onAnimalsChange(animals);
    }, [animals, onAnimalsChange]);

    return null;
}

describe("Can specify animal name", () => {
    const renderWithProvider = () => {
        const animalsCallback = mock((animals: Animal[]) => animals);

        render(
            <AnimalProvider>
                <AddAnimalForm />
                <AnimalList />
                <TestContextConsumer onAnimalsChange={animalsCallback} />
            </AnimalProvider>
        );

        return { animalsCallback };
    }

    test("should add a new animal with the given name to the context and display it in the ui", () => {
        const { animalsCallback } = renderWithProvider();

        const input = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(input, { target: { value: "Stefan" } });
        fireEvent.submit(form);
        
        // Check that the input is cleared
        expect((input as HTMLInputElement).value).toBe("");
        
        // Check that the animals list in context has been updated
        expect(animalsCallback).toHaveBeenLastCalledWith([{
            id: expect.any(String),
            name: "Stefan",
            stats: {
                happiness: 50,
                hunger: 50,
                sleep: 50,
            }
        }]);
        
        // Check that the animal name is displayed in the ui list
        const animalName = screen.getByText("Stefan");
        expect(animalName).toBeInTheDocument();
    })

    test("should not add an animal with an empty name", () => {
        const { animalsCallback } = renderWithProvider();

        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.submit(form);

        expect(animalsCallback).toHaveBeenLastCalledWith([]);
    })
})