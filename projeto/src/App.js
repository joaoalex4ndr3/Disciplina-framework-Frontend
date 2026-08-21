import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  function adicionarNumero(numero) {
    if (waitingForNewValue) {
      setDisplay(numero);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? numero : display + numero);
    }
  }

  function adicionarDecimal() {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function escolherOperador(novoOperador) {
    const valorAtual = parseFloat(display);

    if (operator && previousValue !== null) {
      const resultado = calcular(previousValue, valorAtual, operator);

      setDisplay(String(resultado));
      setPreviousValue(resultado);
    } else {
      setPreviousValue(valorAtual);
    }

    setOperator(novoOperador);
    setWaitingForNewValue(true);
  }

  function calcular(valor1, valor2, operacao) {
    switch (operacao) {
      case "+":
        return valor1 + valor2;

      case "-":
        return valor1 - valor2;

      case "×":
        return valor1 * valor2;

      case "÷":
        return valor2 === 0 ? 0 : valor1 / valor2;

      default:
        return valor2;
    }
  }

  function resultado() {
    if (!operator || previousValue === null) {
      return;
    }

    const valorAtual = parseFloat(display);
    const resultadoFinal = calcular(previousValue, valorAtual, operator);

    setDisplay(String(resultadoFinal));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  }

  function limpar() {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  }

  function porcentagem() {
    const valor = parseFloat(display);
    setDisplay(String(valor / 100));
  }

  function inverterSinal() {
    const valor = parseFloat(display);
    setDisplay(String(valor * -1));
  }

  return (
    <div className="app">
      <div className="calculadora">

        <div className="visor">
          {display}
        </div>

        <div className="botoes">

          <button className="funcao" onClick={limpar}>
            AC
          </button>

          <button className="funcao" onClick={inverterSinal}>
            +/−
          </button>

          <button className="funcao" onClick={porcentagem}>
            %
          </button>

          <button
            className="operador"
            onClick={() => escolherOperador("÷")}
          >
            ÷
          </button>

          <button onClick={() => adicionarNumero("7")}>7</button>
          <button onClick={() => adicionarNumero("8")}>8</button>
          <button onClick={() => adicionarNumero("9")}>9</button>

          <button
            className="operador"
            onClick={() => escolherOperador("×")}
          >
            ×
          </button>

          <button onClick={() => adicionarNumero("4")}>4</button>
          <button onClick={() => adicionarNumero("5")}>5</button>
          <button onClick={() => adicionarNumero("6")}>6</button>

          <button
            className="operador"
            onClick={() => escolherOperador("-")}
          >
            −
          </button>

          <button onClick={() => adicionarNumero("1")}>1</button>
          <button onClick={() => adicionarNumero("2")}>2</button>
          <button onClick={() => adicionarNumero("3")}>3</button>

          <button
            className="operador"
            onClick={() => escolherOperador("+")}
          >
            +
          </button>

          <button
            className="zero"
            onClick={() => adicionarNumero("0")}
          >
            0
          </button>

          <button onClick={adicionarDecimal}>
            .
          </button>

          <button
            className="igual"
            onClick={resultado}
          >
            =
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;