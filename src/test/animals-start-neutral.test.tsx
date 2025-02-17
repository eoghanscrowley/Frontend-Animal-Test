import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider } from "./test-utils";

describe("Animals start neutral", () => {
    test("new animals should start with neutral (50) values for all metrics", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        // Add animals of each type to verify all types start neutral
        const nameInput = screen.getByTestId("animal-name-input");
        const typeSelect = screen.getByTestId("animal-type-select");
        const form = screen.getByTestId("add-animal-form");
        
        // Test poodle
        fireEvent.change(nameInput, { target: { value: "TestPoodle" } });
        fireEvent.change(typeSelect, { target: { value: "poodle" } });
        fireEvent.submit(form);

        // Test beagle
        fireEvent.change(nameInput, { target: { value: "TestBeagle" } });
        fireEvent.change(typeSelect, { target: { value: "beagle" } });
        fireEvent.submit(form);

        // Test dachshund
        fireEvent.change(nameInput, { target: { value: "TestDachshund" } });
        fireEvent.change(typeSelect, { target: { value: "dachshund" } });
        fireEvent.submit(form);

        // Verify all animals start with neutral stats
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "TestPoodle",
                type: "poodle",
                stats: {
                    happiness: 50,
                    hunger: 50,
                    sleep: 50
                }
            }),
            expect.objectContaining({
                name: "TestBeagle",
                type: "beagle",
                stats: {
                    happiness: 50,
                    hunger: 50,
                    sleep: 50
                }
            }),
            expect.objectContaining({
                name: "TestDachshund",
                type: "dachshund",
                stats: {
                    happiness: 50,
                    hunger: 50,
                    sleep: 50
                }
            })
        ]);
    });
});
