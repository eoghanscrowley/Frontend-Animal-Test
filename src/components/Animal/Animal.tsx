import { Animal as AnimalType } from "../../types/animal.types";

import "./Animal.css";

function AnimalStat(
    { name, value, actionName }: { name: string, value: number, actionName: string }
) {
    return (
        <div className="stat">
            <strong>{name}:</strong>
            <div className="meter">
                <div className="meter-fill" style={{ width: `${value}%` }} />
            </div>
            <button className="action-button">{actionName}</button>
        </div>
    )
}

export default function Animal({ animal }: { animal: AnimalType }) {
    return (
        <div className="animal-wrapper">
            <div className="animal-container">
                <h1>{animal.type}</h1>
                <div className="animal-animal">
                    <img
                        src={`src/svg/${animal.type}.svg`}
                        alt="Your animal"
                        className="animal-image"
                    />
                    <h2>Animal Name</h2>
                    <p>{animal.name}</p>
                </div>
                <div className="animal-stats">
                    <AnimalStat
                        name="Hunger"
                        value={animal.stats.hunger}
                        actionName="Feed"
                    />
                    <AnimalStat
                        name="Happiness"
                        value={animal.stats.happiness}
                        actionName="Play"
                    />
                    <AnimalStat
                        name="Sleep"
                        value={animal.stats.sleep}
                        actionName="Rest"
                    />
                </div>
            </div>
        </div>
    )
}