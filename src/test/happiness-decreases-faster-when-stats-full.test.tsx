import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

describe("Happiness decreases faster when stats are full", () => {
    test("happiness should decrease faster when hunger is full", () => {
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
        
        fireEvent.change(nameInput, { target: { value: "TestDog" } });
        fireEvent.submit(form);

        // Get animal to full hunger, sleepiness and empty happiness by advancing time
        act(() => {
            clock.tick(1800000); // 30 minutes to get hunger to 100
        });

        // Rest the animal to empty sleepiness to remove this stat from the equation
        const restButton = screen.getByTestId("rest-button");
        for (let i = 0; i < 10; i++) {
            fireEvent.click(restButton);
        }
        // Play with the animal to get it to full happiness
        const playButton = screen.getByTestId("play-button");
        for (let i = 0; i < 10; i++) {
            fireEvent.click(playButton);
        }

        // Note initial happiness
        const initialState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const initialHappiness = initialState[0].stats.happiness;

        // Advance time by 10 seconds
        act(() => {
            clock.tick(10000);
        });

        // Verify happiness decreased faster
        const finalState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const happinessDecrease = initialHappiness - finalState[0].stats.happiness;
        
        // Should decrease by 4 instead of just 2
        expect(happinessDecrease).toBe(4);
    });

    test("happiness should decrease faster when sleepiness is full", () => {
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
        
        fireEvent.change(nameInput, { target: { value: "TestDog" } });
        fireEvent.submit(form);

        // Get animal to full hunger, sleepiness and empty happiness by advancing time
        act(() => {
            clock.tick(1800000); // 30 minutes to get both stats to 100
        });

         // Feed the animal to empty hunger to remove this stat from the equation
         const feedButton = screen.getByTestId("feed-button");
         for (let i = 0; i < 10; i++) {
             fireEvent.click(feedButton);
         }
         // Play with the animal to get it to full happiness
         const playButton = screen.getByTestId("play-button");
         for (let i = 0; i < 10; i++) {
             fireEvent.click(playButton);
         }

        // Note initial happiness
        const initialState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const initialHappiness = initialState[0].stats.happiness;

        // Advance time by 10 seconds
        act(() => {
            clock.tick(10000);
        });

        // Verify happiness decreased even faster
        const finalState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const happinessDecrease = initialHappiness - finalState[0].stats.happiness;
        
        // Should decrease by 4 instead of just 2
        expect(happinessDecrease).toBe(4);
    });
}); 