import Animal from "./components/Animal/Animal";
import AddAnimalForm from "./components/AddAnimalForm/AddAnimalForm";
import "./App.css";

function App() {
    return (
        <div className="animal-page">
            <AddAnimalForm />
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
    );
}

export default App;
