import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("testinge");
  }, [count]);

  const handleEntry = () => {
    //console.log(count);
    setCount((c) => c + 1);
    console.log(count);
    localStorage.setItem("nn", count);
    const re = localStorage.getItem("nn");
    //console.log(re);
    const renn = [1, 4];
    localStorage.setItem("ns", JSON.stringify(renn));
    const ren = JSON.parse(localStorage.getItem("ns"));
    //console.log(ren[1]);
    return (
      <>
        <form>
          <label htmlFor="n"></label>
        </form>
      </>
    );
    //return <dialog>n</dialog>;
  };
  return (
    <>
      <header>
        <nav className="bg-orange-600">
          <div>Homepage</div>
        </nav>
      </header>
      <main>
        <button className=" bg-orange-950" onClick={handleEntry}>
          Add Entry
        </button>
      </main>
      <div></div>
    </>
  );
}

export default App;
