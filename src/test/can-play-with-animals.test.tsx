import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider } from "./test-utils";

describe("Can play with animals", () => {
    test("playing with an animal increases its happiness", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a new animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "TestDog" } });
        fireEvent.submit(form);

        // Initial happiness should be 50
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "TestDog",
                stats: expect.objectContaining({
                    happiness: 50
                })
            })
        ]);

        // Find and click the play button
        const playButton = screen.getByTestId("play-button");
        fireEvent.click(playButton);

        // Verify happiness increased by 10
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "TestDog",
                stats: expect.objectContaining({
                    happiness: 60
                })
            })
        ]);

        // Click play button again
        fireEvent.click(playButton);

        // Verify happiness increased again
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "TestDog",
                stats: expect.objectContaining({
                    happiness: 70
                })
            })
        ]);
    });

    test("happiness cannot exceed 100", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a new animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "TestDog" } });
        fireEvent.submit(form);

        // Click play button multiple times
        const playButton = screen.getByTestId("play-button");
        for (let i = 0; i < 6; i++) {
            fireEvent.click(playButton);
        }

        // Verify happiness is capped at 100
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "TestDog",
                stats: expect.objectContaining({
                    happiness: 100
                })
            })
        ]);
    });
}); 