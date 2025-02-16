import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, beforeEach, jest } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";


describe("Sleepiness increases over time", () => {
    
    test("animal sleepiness should increase periodically", () => {
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
        
        fireEvent.change(nameInput, { target: { value: "Sleepy" } });
        fireEvent.submit(form);

        // Initial sleep should be 50
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Sleepy",
                stats: expect.objectContaining({
                    sleep: 50
                })
            })
        ]);

        // Advance time by 1 minute
        act(() => {
            clock.tick(60000);
        });

        // Sleep should have increased
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Sleepy",
                stats: expect.objectContaining({
                    sleep: 62
                })
            })
        ]);

        // Advance time by another minute
        act(() => {
            clock.tick(60000);
        });

        // Sleep should have increased again
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Sleepy",
                stats: expect.objectContaining({
                    sleep: 74
                })
            })
        ]);
    });

    test("sleepiness should not exceed 100", () => {
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
        
        fireEvent.change(nameInput, { target: { value: "Sleepy" } });
        fireEvent.submit(form);

        // Advance time by 30 minutes
        act(() => {
            clock.tick(1800000);
        });

        // Sleep should be capped at 100
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Sleepy",
                stats: expect.objectContaining({
                    sleep: 100
                })
            })
        ]);
    });
}); 