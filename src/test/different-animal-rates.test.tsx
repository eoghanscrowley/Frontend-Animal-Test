import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

import { GAME_CONSTANTS } from "../constants/game.constants";

describe("Different animal types have different rates", () => {
    test("different animals should have different rate changes", () => {
        const clock = fakeTimers();
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add a poodle
        const nameInput = screen.getByTestId("animal-name-input");
        const typeSelect = screen.getByTestId("animal-type-select");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "Poodle" } });
        fireEvent.change(typeSelect, { target: { value: "poodle" } });
        fireEvent.submit(form);

        // Add a beagle
        fireEvent.change(nameInput, { target: { value: "Beagle" } });
        fireEvent.change(typeSelect, { target: { value: "beagle" } });
        fireEvent.submit(form);

        // Initial stats should be 50 for both
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                type: "poodle",
                stats: expect.objectContaining({
                    hunger: 50,
                    sleep: 50,
                    happiness: 50
                })
            }),
            expect.objectContaining({
                type: "beagle",
                stats: expect.objectContaining({
                    hunger: 50,
                    sleep: 50,
                    happiness: 50
                })
            })
        ]);

        // Advance time by 1 minute (6 ticks of 10 seconds)
        act(() => {
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 6);
        });

        // Verify different rates for different animals
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                type: "poodle",
                stats: expect.objectContaining({
                    hunger: 56, // 1 per tick * 6
                    sleep: 62, // 2 per tick * 6
                    happiness: 44 // 1 per tick * 6
                })
            }),
            expect.objectContaining({
                type: "beagle",
                stats: expect.objectContaining({
                    hunger: 68, // 3 per tick * 6
                    sleep: 56, // 1 per tick * 6
                    happiness: 38 // 2 per tick * 6
                })
            })
        ]);
    });
}); 