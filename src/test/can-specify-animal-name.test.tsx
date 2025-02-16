import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider } from "./test-utils";


describe("Can specify animal name", () => {
    

    test("should add a new animal with the given name to the context and display it in the ui", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

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
            type: "poodle",
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
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.submit(form);

        expect(animalsCallback).toHaveBeenLastCalledWith([]);
    })
})