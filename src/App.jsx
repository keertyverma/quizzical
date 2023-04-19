import "./App.css";
import topShape from "./assets/images/top-shape.png";
import bottomShape from "./assets/images/bottom-shape.png";

function App() {
  return (
    <main>
      <img className="top-shape" src={topShape}></img>
      <img className="bottom-shape" src={bottomShape}></img>

      <section className="game-intro">
        <h1 className="game-title">Quizzical</h1>
        <p>Play, learn, and conquer</p>
        <button className="btn-primary">Start Quiz</button>
      </section>
    </main>
  );
}

export default App;
