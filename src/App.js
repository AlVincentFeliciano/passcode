import './App.css';
import { useState } from "react";

function Display({ display }) {
  return (
    <div className="Display">
      {display}
    </div>
  );
}

function Key({ label, clickHandler, className = "" }) {
  return (
    <button className={`ButtonKeys ${className}`} onClick={clickHandler}>
      {label}
    </button>
  );
}

function App() {
  const [disp, setDisp] = useState("INPUT CODE");
  const [pin, setPin] = useState("");
  const [storedPin, setStoredPin] = useState("1234567890");
  const [step, setStep] = useState("input");

  const handleButtonClick = (e) => {
    e.preventDefault();
    const label = e.target.innerHTML;

    if (label === "ENTER") {
      handleEnter();
    } else if (label === "RESET") {
      handleReset();
    } else if (label === "PIN") {
      handleChangePin();
    } else if (label === "NAME") {
      setDisp("AL VINCENT FELICIANO");
    } else if (label === "SUBJ") {
      setDisp("CPEITEL3");
    } else {
      setPin((prev) => prev + label);
      setDisp(pin + label);
    }
  };

  const handleEnter = () => {
    if (step === "input") {
      setDisp(pin === storedPin ? "OPEN" : "LOCKED");
    } else if (step === "change1") {
      if (pin === storedPin) {
        setDisp("ENTER NEW CODE");
        setStep("change2");
      } else {
        setDisp("INVALID CODE");
      }
    } else if (step === "change2") {
      if (pin.length >= 8) {
        setStoredPin(pin);
        setDisp("CHANGE CODE SUCCESSFUL");
      } else {
        setDisp("CODE SHOULD BE 8 DIGITS");
      }
      setStep("input");
    }
    setPin("");
  };

  const handleReset = () => {
    setDisp("INPUT CODE");
    setPin("");
    setStep("input");
  };

  const handleChangePin = () => {
    setDisp("ENTER CURRENT CODE");
    setStep("change1");
    setPin("");
  };

  return (
    <div className="App">

      <div className="CalcContainer">
        <div className="DispContainer">
          <Display display={disp} />
        </div>

        <div className="ButtonsContainer">
          <Key label={7} clickHandler={handleButtonClick} />
          <Key label={8} clickHandler={handleButtonClick} />
          <Key label={9} clickHandler={handleButtonClick} />
          <Key label={4} clickHandler={handleButtonClick} />
          <Key label={5} clickHandler={handleButtonClick} />
          <Key label={6} clickHandler={handleButtonClick} />
          <Key label={1} clickHandler={handleButtonClick} />
          <Key label={2} clickHandler={handleButtonClick} />
          <Key label={3} clickHandler={handleButtonClick} />
          <Key label={"RESET"} clickHandler={handleButtonClick} className="ClearButton" />
          <Key label={0} clickHandler={handleButtonClick} />
          <Key label={"ENTER"} clickHandler={handleButtonClick} className="OperatorButton" />
          <Key label={"NAME"} clickHandler={handleButtonClick} className="OperatorButton" />
          <Key label={"SUBJ"} clickHandler={handleButtonClick} className="OperatorButton" />
          <Key label={"PIN"} clickHandler={handleButtonClick} className="OperatorButton" />
        </div>
      </div>
    </div>
  );
}

export default App;
