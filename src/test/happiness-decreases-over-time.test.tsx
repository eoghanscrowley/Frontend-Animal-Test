import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

import { Animal } from "../types/animal.types";
import { ANIMAL_RATE_CONFIGS } from "../constants/animal.constants";
import { GAME_CONSTANTS } from "../constants/game.constants";
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

        const mostRecentState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const animalType = (mostRecentState[0] as Animal).type;
        const happinessRate = ANIMAL_RATE_CONFIGS[animalType].happinessRate;

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
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 6);
        });

        // Happiness should have decreased
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Happy",
                stats: expect.objectContaining({
                    happiness: 50 - (happinessRate * 6)
                })
            })
        ]);

        // Advance time by another minute
        act(() => {
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 6);
        });

        // Happiness should have decreased again
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Happy",
                stats: expect.objectContaining({
                    happiness: 50 - (happinessRate * 12)
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
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 180);
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
