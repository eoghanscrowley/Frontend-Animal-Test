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

export default function Animal() {
    return (
        <div className="animal-container">
            <h1>Poodle</h1>
            <div className="animal-animal">
                <img
                    src="src/poodle.svg"
                    alt="Your animal"
                    className="animal-image"
                />
                <h2>Animal Name</h2>
            </div>
            <div className="animal-stats">
                <AnimalStat name="Hunger" value={60} actionName="Feed" />
                <AnimalStat name="Happiness" value={80} actionName="Play" />
                <AnimalStat name="Sleep" value={50} actionName="Rest" />
            </div>
        </div>
    )
}