import { memo, useMemo } from 'react';
import { Animal as AnimalType } from "../../types/animal.types";
import { useAnimalContext } from "../../context/AnimalContext";
import "./Animal.css";

/**
 * This interface defines the props for the AnimalStat component.
 */
interface AnimalStatProps {
    name: string;
    value: number;
    actionName: string;
    onClick: () => void;
}

/**
 * This component displays a single stat of an animal.
 * It provides a button to perform an action on the animal which relates to the stat.
 */
const AnimalStat = memo(function AnimalStat({ 
    name, 
    value, 
    actionName, 
    onClick 
}: AnimalStatProps) {
    const meterStyle = useMemo(() => ({ 
        width: `${value}%` 
    }), [value]);

    return (
        <div className="stat">
            <strong>{name}:</strong>
            <div className="meter">
                <div 
                    className="meter-fill" 
                    style={meterStyle} 
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <button 
                className="action-button"
                onClick={onClick}
                data-testid={`${actionName.toLowerCase()}-button`}
            >
                {actionName}
            </button>
        </div>
    );
});

/**
 * This interface defines the props for the Animal component.
 */
interface AnimalProps {
    animal: AnimalType;
}

/**
 * This component displays the information and stats of an animal.
 * It provides buttons to perform actions on the animal.
 */
export default memo(function Animal({ animal }: AnimalProps) {
    const { playWithAnimal, feedAnimal, restAnimal } = useAnimalContext();

    return (
        <div className="animal-wrapper">
            <div className="animal-container">
                <h1>{animal.type}</h1>
                <div className="animal-animal">
                    <img
                        src={`/src/svg/${animal.type}.svg`}
                        alt={`${animal.name} the ${animal.type}`}
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
                        onClick={() => restAnimal(animal.id)}
                    />
                </div>
            </div>
        </div>
    );
});