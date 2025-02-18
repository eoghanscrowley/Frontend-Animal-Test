import { screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider, fakeTimers } from "./test-utils";

import { Animal } from "../types/animal.types";
import { ANIMAL_RATE_CONFIGS } from "../constants/animal.constants";
import { GAME_CONSTANTS } from "../constants/game.constants";

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
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 180); // 30 minutes to get hunger to 100
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
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL);
        });

        // Verify happiness decreased faster
        const finalState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const happinessDecrease = initialHappiness - finalState[0].stats.happiness;
        
        // Should be double normal rate
        const animalType = (finalState[0] as Animal).type;
        expect(happinessDecrease).toBe(ANIMAL_RATE_CONFIGS[animalType].happinessRate * 2);
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
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL * 180); // 30 minutes to get both stats to 100
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
            clock.tick(GAME_CONSTANTS.TICK_INTERVAL);
        });

        // Verify happiness decreased even faster
        const finalState = animalsCallback.mock.calls[animalsCallback.mock.calls.length - 1][0];
        const happinessDecrease = initialHappiness - finalState[0].stats.happiness;
        
        // Should be double normal rate
        const animalType = (finalState[0] as Animal).type;
        expect(happinessDecrease).toBe(ANIMAL_RATE_CONFIGS[animalType].happinessRate * 2);
    });
}); 