import { Animal as AnimalType } from "../../types/animal.types";
import { useAnimalContext } from "../../context/AnimalContext";
import "./Animal.css";

function AnimalStat(
    { name, value, actionName, onClick }: { 
        name: string, 
        value: number, 
        actionName: string,
        onClick: () => void 
    }
) {
    return (
        <div className="stat">
            <strong>{name}:</strong>
            <div className="meter">
                <div className="meter-fill" style={{ width: `${value}%` }} />
            </div>
            <button 
                className="action-button"
                onClick={onClick}
                data-testid={`${actionName.toLowerCase()}-button`}
            >
                {actionName}
            </button>
        </div>
    )
}

export default function Animal({ animal }: { animal: AnimalType }) {
    const { playWithAnimal, feedAnimal } = useAnimalContext();

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
                        onClick={() => feedAnimal(animal.id)}
                    />
                    <AnimalStat
                        name="Happiness"
                        value={animal.stats.happiness}
                        actionName="Play"
                        onClick={() => playWithAnimal(animal.id)}
                    />
                    <AnimalStat
                        name="Sleep"
                        value={animal.stats.sleep}
                        actionName="Rest"
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}