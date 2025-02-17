import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

import { Animal } from "../types/animal.types";
import { ANIMAL_RATE_CONFIGS } from "../constants/animal.constants";
import { GAME_CONSTANTS } from "../constants/game.constants";
describe("Hunger increases over time", () => {
    test("animal hunger should increase periodically", () => {
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
        
        fireEvent.change(nameInput, { target: { value: "Hungry" } });
        fireEvent.submit(form);

        const mostRecentState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const animalType = (mostRecentState[0] as Animal).type;
        const hungerRate = ANIMAL_RATE_CONFIGS[animalType].hungerRate;

        // Initial hunger should be 50
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Hungry",
                stats: expect.objectContaining({
                    hunger: 50
                })
            })
        ]);

        // Advance time by 1 minute
        act(() => {
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 6);
        });

        // Hunger should have increased
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Hungry",
                stats: expect.objectContaining({
                    hunger: 50 + (hungerRate * 6)
                })
            })
        ]);

        // Advance time by another minute
        act(() => {
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 6);
        });

        // Hunger should have increased again
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Hungry",
                stats: expect.objectContaining({
                    hunger: 50 + (hungerRate * 12)
                })
            })
        ]);
    });

    test("hunger should not exceed 100", () => {
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
        
        fireEvent.change(nameInput, { target: { value: "Hungry" } });
        fireEvent.submit(form);

        // Advance time by 30 minutes
        act(() => {
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 180);
        });

        // Hunger should be capped at 100
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Hungry",
                stats: expect.objectContaining({
                    hunger: 100
                })
            })
        ]);
    });
}); 