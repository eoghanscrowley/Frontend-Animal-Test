import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

describe("Happiness decreases over time", () => {
    test("animal happiness should decrease periodically", () => {
        const clock = fakeTimers();
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a new animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "Happy" } });
        fireEvent.submit(form);

        // Initial happiness should be 50
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Happy",
                stats: expect.objectContaining({
                    happiness: 50
                })
            })
        ]);

        // Advance time by 1 minute
        act(() => {
            clock.tick(60000);
        });

        // Happiness should have decreased
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Happy",
                stats: expect.objectContaining({
                    happiness: 38
                })
            })
        ]);

        // Advance time by another minute
        act(() => {
            clock.tick(60000);
        });

        // Happiness should have decreased again
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Happy",
                stats: expect.objectContaining({
                    happiness: 26
                })
            })
        ]);
    });

    test("happiness should not go below 0", () => {
        const clock = fakeTimers();
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a new animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "Sad" } });
        fireEvent.submit(form);

        // Advance time by 30 minutes
        act(() => {
            clock.tick(1800000);
        });

        // Happiness should be capped at 0
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Sad",
                stats: expect.objectContaining({
                    happiness: 0
                })
            })
        ]);
    });
});
