
import { useState } from "react";
import "./App.css";

function Cabecalho() {
  return (
    <header className="cabecalho">
      <div>
        <span className="marca">TASKFLOW</span>
        <h1>Meu gerenciador de tarefas</h1>
        <p>Organize suas atividades em um só lugar.</p>
      </div>
    </header>
  );
}

function Resumo({ tarefas }) {
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = tarefas.length - concluidas;

  return (
    <section className="resumo">
      <article className="resumo-card">
        <span>Total de tarefas</span>
        <strong>{tarefas.length}</strong>
      </article>

      <article className="resumo-card">
        <span>Pendentes</span>
        <strong>{pendentes}</strong>
      </article>

      <article className="resumo-card">
        <span>Concluídas</span>
        <strong>{concluidas}</strong>
      </article>
    </section>
  );
}

function FormularioTarefa({ adicionarTarefa }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();

    if (!titulo.trim()) {
      return;
    }

    adicionarTarefa(titulo, descricao);
    setTitulo("");
    setDescricao("");
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Adicionar tarefa</h2>

      <label htmlFor="titulo">Título</label>
      <input
        id="titulo"
        type="text"
        placeholder="Ex.: Estudar React"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
      />

      <label htmlFor="descricao">Descrição</label>
      <textarea
        id="descricao"
        placeholder="Descreva sua atividade..."
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        rows="3"
      />

      <button className="botao-principal" type="submit">
        Adicionar tarefa
      </button>
    </form>
  );
}

function ListaTarefas({ tarefas, alterarStatus, removerTarefa }) {
  if (tarefas.length === 0) {
    return (
      <div className="vazio">
        <h3>Nenhuma tarefa encontrada</h3>
        <p>Adicione uma tarefa ou altere o filtro selecionado.</p>
      </div>
    );
  }

  return (
    <div className="lista">
      {tarefas.map((tarefa) => (
        <article
          className={`tarefa ${tarefa.concluida ? "concluida" : ""}`}
          key={tarefa.id}
        >
          <div className="tarefa-conteudo">
            <span className="status">
              {tarefa.concluida ? "Concluída" : "Pendente"}
            </span>
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.descricao || "Sem descrição."}</p>
          </div>

          <div className="acoes">
            <button
              className="botao-secundario"
              onClick={() => alterarStatus(tarefa.id)}
            >
              {tarefa.concluida ? "Reabrir" : "Concluir"}
            </button>

            <button
              className="botao-remover"
              onClick={() => removerTarefa(tarefa.id)}
            >
              Excluir
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: "Estudar JSX e componentes",
      descricao: "Revisar o conteúdo da Aula 08.",
      concluida: false,
    },
    {
      id: 2,
      titulo: "Praticar props no React",
      descricao: "Entender como passar dados entre componentes.",
      concluida: true,
    },
  ]);

  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(titulo, descricao) {
    const novaTarefa = {
      id: Date.now(),
      titulo,
      descricao,
      concluida: false,
    };

    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
  }

  function alterarStatus(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function removerTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id)
    );
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });

  return (
    <main className="container">
      <Cabecalho />

      <Resumo tarefas={tarefas} />

      <div className="conteudo">
        <FormularioTarefa adicionarTarefa={adicionarTarefa} />

        <section className="painel-tarefas">
          <div className="titulo-lista">
            <div>
              <h2>Minhas tarefas</h2>
              <p>Acompanhe suas atividades.</p>
            </div>

            <select
              aria-label="Filtrar tarefas"
              value={filtro}
              onChange={(evento) => setFiltro(evento.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="pendentes">Pendentes</option>
              <option value="concluidas">Concluídas</option>
            </select>
          </div>

          <ListaTarefas
            tarefas={tarefasFiltradas}
            alterarStatus={alterarStatus}
            removerTarefa={removerTarefa}
          />
        </section>
      </div>

      <footer className="rodape">
        Projeto acadêmico de React — Aula 08
      </footer>
    </main>
  );
}

export default App;
