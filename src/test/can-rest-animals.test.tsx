import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider } from "./test-utils";

describe("Can rest animals", () => {
    test("resting an animal decreases its sleepiness", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a new animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "McSnores" } });
        fireEvent.submit(form);

        // Initial sleep should be 50
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                stats: expect.objectContaining({
                    sleep: 50
                })
            })
        ]);

        // Find and click the rest button
        const restButton = screen.getByTestId("rest-button");
        fireEvent.click(restButton);

        // Verify sleep decreased by 10
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                stats: expect.objectContaining({
                    sleep: 40
                })
            })
        ]);
    });

    test("sleep cannot go below 0", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a new animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "Alert Einstein" } });
        fireEvent.submit(form);

        // Click rest button multiple times
        const restButton = screen.getByTestId("rest-button");
        for (let i = 0; i < 6; i++) {
            fireEvent.click(restButton);
        }

        // Verify sleep is capped at 0
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                stats: expect.objectContaining({
                    sleep: 0
                })
            })
        ]);
    });
}); 