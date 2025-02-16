import {  screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "bun:test";

import AddAnimalForm from "../components/AddAnimalForm/AddAnimalForm";
import AnimalList from "../components/AnimalList/AnimalList";

import { renderWithProvider } from "./test-utils";


describe("Can create different animal types", () => {

    test("should add different types of animals", () => {
        const { animalsCallback } = renderWithProvider(
            <>
                <AddAnimalForm />
                <AnimalList />
            </>
        );

        const nameInput = screen.getByTestId("animal-name-input");
        const typeSelect = screen.getByTestId("animal-type-select");
        const form = screen.getByTestId("add-animal-form");
        
        // Add a poodle
        fireEvent.change(nameInput, { target: { value: "Poodlini" } });
        fireEvent.change(typeSelect, { target: { value: "poodle" } });
        fireEvent.submit(form);

        // Add a beagle
        fireEvent.change(nameInput, { target: { value: "Dogfrey" } });
        fireEvent.change(typeSelect, { target: { value: "beagle" } });
        fireEvent.submit(form);

        // Add a dachshund
        fireEvent.change(nameInput, { target: { value: "Sir Longbottom" } });
        fireEvent.change(typeSelect, { target: { value: "dachshund" } });
        fireEvent.submit(form);

        // Verify both animals were added with correct types
        expect(animalsCallback).toHaveBeenLastCalledWith([
            expect.objectContaining({
                name: "Poodlini",
                type: "poodle"
            }),
            expect.objectContaining({
                name: "Dogfrey",
                type: "beagle"
            }),
            expect.objectContaining({
                name: "Sir Longbottom",
                type: "dachshund"
            })
        ]);

        // Verify animals are displayed in UI
        expect(screen.getByText("Poodlini")).toBeInTheDocument();
        expect(screen.getByText("Dogfrey")).toBeInTheDocument();
        expect(screen.getByText("Sir Longbottom")).toBeInTheDocument();
    });
});