import Animal from "../Animal/Animal";
import { useAnimalContext } from "../../context/AnimalContext";

import "./AnimalList.css";

/**
 * This component displays a list of animals.
 * It provides a list of Animal components which are generated from the AnimalContext.
 */
export default function AnimalList() {
    const { animals } = useAnimalContext();

    return (
        <div className="animal-list">
            {animals.map((animal) => (
                <Animal key={animal.id} animal={animal} />
            ))}
        </div>
    );
}