import Animal from "../Animal/Animal";
import { useAnimalContext } from "../../context/AnimalContext";

import "./AnimalList.css";

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