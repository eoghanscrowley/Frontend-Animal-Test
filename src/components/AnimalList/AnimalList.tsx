import Animal from "../Animal/Animal";
import { useAnimalContext } from "../../context/AnimalContext";

import "./AnimalList.css";

function ZeroState() {
    return (
        <div 
            className="zero-state"
            role="status"
            aria-label="No animals added yet"
        >
            Animals will appear here once you add them
        </div>
    );
}

/**
 * This component displays a list of animals.
 * It provides a list of Animal components which are generated from the AnimalContext.
 */
export default function AnimalList() {
    const { animals } = useAnimalContext();

    return (
        <div
            className="animal-list"
            aria-label="List of animals"
            role="list"
        >
            {animals.length === 0 ? <ZeroState /> : animals.map((animal) => (
                <Animal key={animal.id} animal={animal} />
            ))}
        </div>
    );
}