import { memo, useState, useCallback } from "react";

import { useAnimalContext } from "../../context/AnimalContext";
import { AnimalType } from "../../types/animal.types";
import { ALL_ANIMAL_TYPES } from "../../constants/animal.constants";

import "./AddAnimalForm.css";

/**
 * This component allows the user to add a new animal to the app. 
 * It provides a form for the user to enter the animal's name and type,
 * and a button to submit the form.
 */
export default memo(function AddAnimalForm() {
    const [name, setName] = useState("");
    const [type, setType] = useState<AnimalType>(ALL_ANIMAL_TYPES[0]);
    const { addAnimal } = useAnimalContext();

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim()) {
            addAnimal(name, type);
            setName("");
        }
    }, [name, type, addAnimal]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as AnimalType);
    }, []);

    return (
        <form
            className="add-animal-form"
            data-testid="add-animal-form"
            onSubmit={handleSubmit}
            aria-label="Add new animal form"
        >
            <label htmlFor="animal-name">
                Animal Name:
                <input
                    type="text"
                    id="animal-name"
                    placeholder="Enter animal name"
                    data-testid="animal-name-input"
                    value={name}
                    onChange={handleNameChange}
                    required
                    aria-required="true"
                />
            </label>
            <label htmlFor="animal-type">
                Animal Type:
                <select
                    id="animal-type"
                    data-testid="animal-type-select"
                    value={type}
                    onChange={handleTypeChange}
                    aria-label="Select animal type"
                >
                    {ALL_ANIMAL_TYPES.map((animalType) => (
                        <option key={animalType} value={animalType}>
                            {animalType}
                        </option>
                    ))}
                </select>
            </label>
            <button
                type="submit"
                aria-label="Add new animal"
            >
                Add Animal
            </button>
        </form>
    );
});