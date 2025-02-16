import Animal from "./components/Animal/Animal";

import "./App.css";

function App() {
  return (
    <div className="animal-page">
      <button>Add Animal</button>
      <div className="animal-wrapper">
        <Animal />
      </div>
    </div>
  );
}

export default App;
