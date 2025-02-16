import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

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
            clock.tick(60000);
        });

        // Hunger should have increased
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Hungry",
                stats: expect.objectContaining({
                    hunger: 62
                })
            })
        ]);

        // Advance time by another minute
        act(() => {
            clock.tick(60000);
        });

        // Hunger should have increased again
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Hungry",
                stats: expect.objectContaining({
                    hunger: 74
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
            clock.tick(1800000);
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