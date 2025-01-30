import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import "./App.css";

function App() {
  // State variables
  const [info, setInfo] = useState({});
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("npr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch currency data whenever 'from' changes
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    )
      .then((res) => {
        setInfo(res.data[from]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [from]);

  // Update options and convert when 'info' changes
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  // Function to convert the currency
  function convert() {
    if (!input || isNaN(input)) {
      setOutput(0);
      return;
    }
    const rate = info[to];
    setOutput(input * rate);
  }

  // Function to switch between two currencies
  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  // Automatically convert when input or currencies change
  useEffect(() => {
    convert();
  }, [input, from, to]);

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency Converter</h1>
      </div>
      <div className="container">
        <div className="input-group">
          <h3>Amount</h3>
          <input
            type="number"
            placeholder="Enter amount"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="input-group">
          <h3>From</h3>
          <Dropdown
            options={options}
            onChange={(e) => setFrom(e.value)}
            value={from}
            placeholder="From"
          />
        </div>
        <div className="switch" onClick={flip}>
          <HiSwitchHorizontal size="30px" />
        </div>
        <div className="input-group">
          <h3>To</h3>
          <Dropdown
            options={options}
            onChange={(e) => setTo(e.value)}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result">
        <h2>Converted Amount:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            {input} {from} = {output.toFixed(2)} {to}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
