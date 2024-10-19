import React, { useState } from "react";
import "./App.css";
import { Wallet } from "./components/Wallet";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
        <button>Submit</button>
      <Wallet />
    </div>
  );
}

export default App;
