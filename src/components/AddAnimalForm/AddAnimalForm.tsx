import { useState } from "react";

import "./AddAnimalForm.css";

export default function AddAnimalForm() {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name);
        setName("");
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
            <button type="submit">Add Animal</button>
        </form>
    );
}