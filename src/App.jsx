import { Login, Signup } from "./components";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="columns is-variable is-8-desktop">
        <div className="column">
          <section className="section">
            <Login />
          </section>
        </div>
        <div className="column">
          <section className="section">
            <Signup />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
