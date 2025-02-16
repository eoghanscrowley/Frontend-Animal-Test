import { useState } from "react";

import { useAnimalContext } from "../../context/AnimalContext";
import { AnimalType, ALL_ANIMAL_TYPES } from "../../types/animal.types";

import "./AddAnimalForm.css";

export default function AddAnimalForm() {
    const [name, setName] = useState("");
    const [type, setType] = useState<AnimalType>(ALL_ANIMAL_TYPES[0]);
    const { addAnimal } = useAnimalContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim()) {
            addAnimal(name, type);
            setName("");
        }
    };

    return (
        <form
            className="add-animal-form"
            data-testid="add-animal-form"
            onSubmit={handleSubmit}
        >
            <label htmlFor="animal-name">
                Animal Name:
                <input
                    type="text"
                    id="animal-name"
                    placeholder="Enter animal name"
                    data-testid="animal-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label htmlFor="animal-type">
                Animal Type:
                <select
                    id="animal-type"
                    data-testid="animal-type-select"
                    value={type}
                    onChange={(e) => setType(e.target.value as AnimalType)}
                >
                    {ALL_ANIMAL_TYPES.map((type: AnimalType) => (
                        <option value={type} key={type}>{type}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Animal</button>
        </form>
    );
}