import React, { useState } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  type Nullable<T> = T | null;

  interface INumbers {
    firstNumber: Nullable<number>;
    secondNumber: Nullable<number>;
  }

  const [numbers, setNumbers] = useState<INumbers>({
    firstNumber: null,
    secondNumber: null,
  });

  const [sum, setSum] = useState<number>();
  const [error, setError] = useState<String>("");

  const isChange = (value: number, key: string) => {
    setNumbers({ ...numbers, [key]: value });
  };

  const isSum = () => {
    const { firstNumber, secondNumber } = numbers;

    if (firstNumber && secondNumber) {
      axios
        .post("http://localhost:5000/sum", numbers)
        .then((res) => {
          setSum(res.data);
          setError('');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError('one of the fields is not filled');
    }
  };

  const { firstNumber, secondNumber } = numbers;

  return (
    <div className="App">
      <header>
        <span>CALCULATOR</span>
      </header>
      <div className="content">
        <div className="computation">
          <span>Enter the numbers</span>
          <input
            onChange={(e) => isChange(+e.target.value, "firstNumber")}
            pattern="[0-9]*"
            value={firstNumber ? firstNumber : ""}
            placeholder="number 1"
          />
          <input
            onChange={(e) => isChange(+e.target.value, "secondNumber")}
            pattern="[0-9]*"
            value={secondNumber ? secondNumber : ""}
            placeholder="number 2"
          />
          <button onClick={() => isSum()}>Sum</button>
          {error && <span className="error">{error}</span>}
        </div>
        <div className="result">
          <span>Result</span>
          <input
            type="text"
            value={sum ? sum : ""}
            placeholder="result"
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default App;
