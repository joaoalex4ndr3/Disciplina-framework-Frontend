"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] =
    useState(false);

  function inputNumber(number: string) {
    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
      return;
    }

    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  }

  function inputDecimal() {
    if (waitingForSecondNumber) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function clearCalculator() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  }

  function deleteNumber() {
    if (display.length === 1) {
      setDisplay("0");
      return;
    }

    setDisplay(display.slice(0, -1));
  }

  function calculate(
    first: number,
    second: number,
    operation: string
  ): number {
    switch (operation) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "*":
        return first * second;

      case "/":
        if (second === 0) {
          return NaN;
        }
        return first / second;

      default:
        return second;
    }
  }

  function chooseOperator(nextOperator: string) {
    const inputValue = parseFloat(display);

    if (firstNumber === null) {
      setFirstNumber(inputValue);
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator);

      if (Number.isNaN(result)) {
        setDisplay("Erro");
        setFirstNumber(null);
        setOperator(null);
        setWaitingForSecondNumber(true);
        return;
      }

      setDisplay(String(result));
      setFirstNumber(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondNumber(true);
  }

  function handleEquals() {
    if (firstNumber === null || operator === null) {
      return;
    }

    const secondNumber = parseFloat(display);

    const result = calculate(
      firstNumber,
      secondNumber,
      operator
    );

    if (Number.isNaN(result)) {
      setDisplay("Erro");
    } else {
      setDisplay(String(result));
    }

    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#5bb9f5] p-6 relative overflow-hidden">
      {/* Nuvens decorativas */}
      <div className="cloud cloud-one">☁️</div>
      <div className="cloud cloud-two">☁️</div>
      <div className="cloud cloud-three">☁️</div>

      {/* Elementos decorativos */}
      <div className="decorative-star star-one">⭐</div>
      <div className="decorative-star star-two">⭐</div>
      <div className="decorative-mushroom mushroom-one">🍄</div>
      <div className="decorative-mushroom mushroom-two">🍄</div>

      <section className="calculator">
        {/* Cabeçalho */}
        <div className="calculator-header">
          <div className="character">
            🍄
          </div>

          <div>
            <h1>SUPER CALCULADORA</h1>
            <p>Mario Edition</p>
          </div>
        </div>

        {/* Tela */}
        <div className="display-container">
          <div className="display">
            {display}
          </div>
        </div>

        {/* Botões */}
        <div className="buttons">

          <button
            className="button action"
            onClick={clearCalculator}
          >
            AC
          </button>

          <button
            className="button action"
            onClick={deleteNumber}
          >
            DEL
          </button>

          <button
            className="button operator"
            onClick={() => chooseOperator("/")}
          >
            ÷
          </button>

          <button
            className="button operator"
            onClick={() => chooseOperator("*")}
          >
            ×
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("7")}
          >
            7
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("8")}
          >
            8
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("9")}
          >
            9
          </button>

          <button
            className="button operator"
            onClick={() => chooseOperator("-")}
          >
            −
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("4")}
          >
            4
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("5")}
          >
            5
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("6")}
          >
            6
          </button>

          <button
            className="button operator"
            onClick={() => chooseOperator("+")}
          >
            +
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("1")}
          >
            1
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("2")}
          >
            2
          </button>

          <button
            className="button number"
            onClick={() => inputNumber("3")}
          >
            3
          </button>

          <button
            className="button equals"
            onClick={handleEquals}
          >
            =
          </button>

          <button
            className="button number zero"
            onClick={() => inputNumber("0")}
          >
            0
          </button>

          <button
            className="button number"
            onClick={inputDecimal}
          >
            .
          </button>

        </div>

        <div className="footer">
          ⭐ POWER-UP CALCULATOR ⭐
        </div>
      </section>
    </main>
  );
}