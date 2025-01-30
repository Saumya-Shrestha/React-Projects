import React, { useState } from "react";
import "./App.css";

function CalculatorApp() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="calculator-app">
      <h1>React Calculator</h1>
      <div className="screen">
        <div className="input">{input || "0"}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) => (
          <button
            key={btn}
            className={btn.match(/[0-9.]/) ? "number" : "operator"}
            onClick={() =>
              btn === "="
                ? calculateResult()
                : btn === "C"
                ? clearInput()
                : handleButtonClick(btn)
            }
          >
            {btn}
          </button>
        ))}
        <button className="clear" onClick={clearInput}>
          C
        </button>
      </div>
    </div>
  );
}

export default CalculatorApp;
