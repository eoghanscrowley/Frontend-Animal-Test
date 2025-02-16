import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider } from "./test-utils";

describe("Can feed animals", () => {
    test("should decrease hunger when feeding an animal", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add an animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "Grubbles" } });
        fireEvent.submit(form);

        // Get initial state
        const initialState = animalsCallback.mock.calls[1][0];
        expect(initialState[0].stats.hunger).toBe(50);

        // Find and click the feed button
        const feedButton = screen.getByTestId("feed-button");
        fireEvent.click(feedButton);

        // Verify hunger decreased
        const finalState = animalsCallback.mock.calls[2][0];
        expect(finalState[0].stats.hunger).toBe(40);
    });

    test("hunger should not go below 0", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add an animal
        const nameInput = screen.getByTestId("animal-name-input");
        const form = screen.getByTestId("add-animal-form");
        
        fireEvent.change(nameInput, { target: { value: "Stuffington" } });
        fireEvent.submit(form);

        // Click feed button multiple times
        const feedButton = screen.getByTestId("feed-button");
        for (let i = 0; i < 10; i++) {
            fireEvent.click(feedButton);
        }

        // Verify hunger stopped at 0
        const finalState = animalsCallback.mock.calls[11][0];
        expect(finalState[0].stats.hunger).toBe(0);
    });
}); 