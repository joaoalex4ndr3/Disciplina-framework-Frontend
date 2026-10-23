
# Gerenciador de Tarefas — React

## Descrição

Aplicação web desenvolvida como atividade acadêmica da aula de Frameworks Front-end do SENAI. O projeto permite cadastrar, visualizar, concluir, filtrar e excluir tarefas.

## Funcionalidades

- Cadastro de tarefas com título e descrição.
- Listagem dinâmica de tarefas.
- Marcação de tarefas como concluídas ou pendentes.
- Filtros por situação.
- Exclusão de tarefas.
- Resumo com total de tarefas, pendentes e concluídas.
- Mensagem condicional quando não existem tarefas.
- Interface responsiva.

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- HTML com JSX
- CSS

## Conceitos React aplicados

- **JSX:** estrutura da interface.
- **Componentes:** divisão da aplicação em partes reutilizáveis.
- **Props:** passagem de dados e funções entre componentes.
- **Estado (`useState`):** gerenciamento das tarefas, dos campos e dos filtros.
- **Virtual DOM:** atualização da interface gerenciada pelo React.
- **Listas e keys:** utilização de `map()` e `key` para renderizar tarefas.
- **Renderização condicional:** exibição de mensagens conforme os dados.
- **Métodos de arrays:** uso de `map()` e `filter()` para atualizar e filtrar tarefas.

## Como executar o projeto

1. Instale o Node.js.
2. Clone ou baixe este repositório.
3. Abra a pasta do projeto no terminal.
4. Instale as dependências:

   ```bash
   npm install
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Abra no navegador o endereço informado pelo Vite.

## Observação

As tarefas são armazenadas no estado da aplicação. Por isso, não ficam salvas permanentemente após recarregar a página.


## Modelagem dos Componentes

## Modelagem em Árvore dos Componentes

```text
Gerenciador de Tarefas
│
├── App
│   │
│   ├── Cabeçalho
│   │   ├── Título da aplicação
│   │   └── Descrição
│   │
│   ├── Resumo de Tarefas
│   │   ├── Total de tarefas
│   │   ├── Tarefas pendentes
│   │   └── Tarefas concluídas
│   │
│   ├── Formulário de Tarefas
│   │   ├── Campo de título
│   │   ├── Campo de descrição
│   │   └── Botão adicionar
│   │
│   └── Lista de Tarefas
│       ├── Filtro de tarefas
│       │   ├── Todas
│       │   ├── Pendentes
│       │   └── Concluídas
│       │
│       └── Item de Tarefa
│           ├── Título
│           ├── Descrição
│           ├── Status
│           ├── Botão concluir/reabrir
│           └── Botão excluir
│
└── Estilização
    ├── App.css
    └── index.css
```

### Conceitos React utilizados

- **JSX:** estrutura da interface.
- **Componentes:** organização dos elementos da aplicação.
- **Props:** passagem de dados e funções entre componentes, quando utilizada.
- **useState:** gerenciamento do estado das tarefas e dos filtros.
- **Listas e Keys:** renderização das tarefas com identificação de cada item.
- **Renderização condicional:** apresentação dos estados das tarefas.
- **Virtual DOM:** atualização eficiente da interface pelo React.
```

**Atenção:** essa árvore representa a organização visual e lógica proposta para o projeto. Como ainda não conferimos o conteúdo completo do seu `App.jsx`, os nomes dos componentes são ilustrativos e podem não corresponder a componentes separados no código.

Para documentar a arquitetura real da aplicação, precisamos conferir o arquivo `Aula8/src/App.jsx` antes de publicar essa versão no GitHub.
