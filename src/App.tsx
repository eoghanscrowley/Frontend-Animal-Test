import Animal from "./components/Animal/Animal";

import "./App.css";

function App() {
    return (
        <div className="animal-page">
            <button>Add Animal</button>
            <div className="animal-wrapper">
                <Animal
                  animal={{
                    id: crypto.randomUUID(),
                    name: "Stefan",
                    stats: {
                        happiness: 80,
                        hunger: 60,
                        sleep: 50,
                    },
                  }}
                />
            </div>
        </div>
    );
}

export default App;
