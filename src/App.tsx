import AddAnimalForm from "./components/AddAnimalForm/AddAnimalForm";
import AnimalList from "./components/AnimalList/AnimalList";

import { AnimalProvider } from "./context/AnimalContext";

import "./App.css";

function App() {
    return (
        <AnimalProvider>
            <div className="animal-page">
                <AddAnimalForm />
                <AnimalList />
            </div>
        </AnimalProvider>
    );
}

export default App;
