import { useEffect } from "react";
import { render } from "@testing-library/react";
import { install } from "@sinonjs/fake-timers";
import { mock, beforeEach, afterEach } from "bun:test";

import { AnimalProvider } from "../context/AnimalContext";
import { useAnimalContext } from "../context/AnimalContext";
import { Animal } from "../types/animal.types";

/**
 * A component that allows us to test the AnimalContext.
 * 
 * @param props - An object containing a function that will be called with the current list of animals.
 * @returns null
 */
export function TestContextConsumer(
    { onAnimalsChange }: { onAnimalsChange: (animals: Animal[]) => void }
) {
    const { animals } = useAnimalContext();

    useEffect(() => {
        onAnimalsChange(animals);
    }, [animals, onAnimalsChange]);

    return null;
}

/**
 * This function renders a component within the AnimalProvider context.
 * It also provides a way to test the AnimalContext.
 * 
 * @param component - The component to render.
 * @returns An object containing the animalsCallback function.
 */
export const renderWithProvider = (component: React.ReactNode) => {
    const animalsCallback = mock((animals: Animal[]) => animals);

    render(
        <AnimalProvider>
            {component}
            <TestContextConsumer onAnimalsChange={animalsCallback} />
        </AnimalProvider>
    );

    return { animalsCallback };
}

/**
 * This function sets up fake timers for testing.
 * 
 * @returns The clock object.
 */
export function fakeTimers() {
    const clock = install();

    beforeEach(() => {
        clock.reset();
    });

    afterEach(() => {
        clock.uninstall();
    });

    return clock;
}