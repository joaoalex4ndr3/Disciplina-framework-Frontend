# Aula 06 — Projetos Front-End

## Introdução

A Aula 06 da disciplina de **Frameworks Front-end** teve como tema principal a gestão de projetos Front-End.

Durante a aula foram apresentados conceitos relacionados ao planejamento, organização e acompanhamento de projetos, incluindo gestão de requisitos, backlog, prioridades, estimativas e critérios de conclusão.

Também foram estudados conceitos do framework Scrum e sua utilização para organizar o desenvolvimento de aplicações Front-End de forma incremental.

A atividade prática teve como objetivo aplicar esses conceitos na gestão do Projeto Integrador Interdisciplinar, utilizando ferramentas de organização e documentação.

---

## Conteúdos da Aula

Durante a aula foram abordados os seguintes conceitos:

* Gestão de Projetos Front-End;
* Gestão de Requisitos;
* Requisitos, User Stories e Tarefas;
* Gestão do Backlog;
* Gestão de Prioridades;
* Estimativas de tarefas;
* Definition of Done;
* Scrum;
* Sprints;
* Kanban;
* Branches;
* Organização e acompanhamento de projetos;
* Documentação em Markdown.

---

# Gestão de Projetos Front-End

## Por que gerenciar um projeto Front-End?

Projetos Front-End podem crescer rapidamente e, sem planejamento e organização, podem apresentar diversos problemas durante o desenvolvimento.

Entre os principais problemas estão:

* Tarefas esquecidas;
* Requisitos confusos;
* Retrabalho;
* Conflitos no Git;
* Atrasos;
* Problemas de integração;
* Dificuldade para acompanhar o progresso.

A gestão de projetos permite organizar o trabalho da equipe e acompanhar o desenvolvimento das funcionalidades.

Quando existe um processo de gestão, o projeto passa a apresentar:

* Responsabilidades claras;
* Prioridades definidas;
* Entregas incrementais;
* Acompanhamento do progresso;
* Redução de retrabalho.

## Conceito de Gestão de Projetos Front-End

Gerenciar projetos Front-End significa organizar pessoas, tarefas, tecnologias e prazos para transformar uma ideia em uma aplicação funcional.

Durante o desenvolvimento, as decisões precisam ser planejadas, acompanhadas e ajustadas para garantir entregas contínuas e alinhadas aos objetivos definidos.

O processo envolve desde a definição dos requisitos até o desenvolvimento, revisão, testes e disponibilização da aplicação aos usuários.

---

# Gestão de Requisitos

Um projeto normalmente começa com uma ideia, que precisa ser transformada em requisitos claros.

Esses requisitos são organizados em um backlog, permitindo que a equipe identifique as funcionalidades necessárias para o desenvolvimento do produto.

Posteriormente, as atividades são priorizadas, desenvolvidas, revisadas, testadas e disponibilizadas aos usuários.

## Requisito, User Story e Tarefa

Durante a aula, foram apresentados três conceitos importantes para organizar o desenvolvimento de funcionalidades.

### Requisito

O requisito descreve uma necessidade ou funcionalidade que o sistema deve atender.

Exemplo:

O sistema deve permitir o gerenciamento de tarefas.

### User Story

A User Story representa uma funcionalidade sob a perspectiva do usuário, descrevendo o que ele deseja realizar.

Exemplo:

Como usuário, quero criar uma tarefa.

### Tarefas

As tarefas representam as atividades técnicas necessárias para implementar uma funcionalidade.

Exemplo de tarefas para a criação de uma tarefa no sistema:

* Criar formulário;
* Criar componente;
* Validar campos;
* Integrar API;
* Criar testes.

A divisão permite transformar uma necessidade geral em atividades menores e mais fáceis de organizar e acompanhar.

---

# Gestão do Backlog

O backlog reúne funcionalidades, melhorias, correções e outras atividades necessárias para desenvolver e evoluir determinado produto.

Ele funciona como uma lista organizada de tudo o que precisa ser realizado no projeto.

Os itens do backlog podem receber prioridades diferentes, permitindo que a equipe concentre seus esforços inicialmente nas funcionalidades mais importantes.

A gestão do backlog facilita o planejamento das atividades e o acompanhamento das necessidades do projeto.

---

# Gestão de Prioridade e Estimativa

## Priorização

A priorização ajuda a equipe a determinar quais funcionalidades precisam ser desenvolvidas primeiro.

Para isso, são considerados os objetivos, as necessidades e as restrições do projeto.

A definição de prioridades permite organizar o trabalho e direcionar os esforços da equipe para as atividades mais relevantes.

## Estimativa

As estimativas ajudam a equipe a compreender a complexidade relativa das atividades antes de assumir determinado conjunto de tarefas.

Elas contribuem para o planejamento do desenvolvimento e para a organização das atividades que serão realizadas.

A priorização define a ordem de importância das funcionalidades, enquanto a estimativa auxilia na compreensão do esforço necessário para executá-las.

---

# Definition of Done

A Definition of Done (DoD), ou Definição de Pronto, estabelece os critérios necessários para considerar uma tarefa realmente concluída dentro de determinado projeto.

Esses critérios ajudam a equipe a manter um padrão de qualidade e a verificar se uma atividade atende às condições estabelecidas.

Entre os critérios que podem fazer parte da Definition of Done estão:

* Código implementado;
* Testes realizados;
* Revisão concluída;
* Responsividade verificada;
* Integração realizada.

A Definition of Done permite que todos os integrantes da equipe compreendam o que significa concluir uma tarefa.

---

# Scrum

O Scrum é um framework ágil utilizado para desenvolver produtos complexos de forma incremental.

Ele permite realizar inspeções frequentes, adaptações e entregas contínuas durante o desenvolvimento.

No desenvolvimento Front-End, o Scrum auxilia a equipe a:

* Organizar requisitos;
* Priorizar funcionalidades;
* Planejar Sprints;
* Acompanhar o trabalho realizado;
* Organizar entregas incrementais.

## Sprints

As Sprints são períodos de trabalho utilizados para organizar o desenvolvimento de um conjunto de atividades.

Durante o planejamento, a equipe define as tarefas que serão realizadas, considerando as prioridades e a capacidade de execução.

Ao longo da Sprint, o progresso é acompanhado e as atividades são desenvolvidas para alcançar os objetivos estabelecidos.

## Kanban

O Kanban é utilizado para visualizar e acompanhar o fluxo de trabalho de um projeto.

Por meio de um quadro, é possível organizar as tarefas conforme seu estado de execução.

Um exemplo de organização é:

| A fazer          | Em andamento           | Concluído              |
| ---------------- | ---------------------- | ---------------------- |
| Criar formulário | Desenvolver componente | Criar estrutura HTML   |
| Validar campos   | Integrar API           | Configurar repositório |

O quadro facilita a visualização do progresso e ajuda a equipe a acompanhar as atividades pendentes, em execução e concluídas.

## Branches

Branches são ramificações utilizadas no Git para desenvolver funcionalidades ou realizar alterações de maneira organizada e independente.

Elas permitem que diferentes integrantes trabalhem em partes distintas do projeto sem modificar diretamente a branch principal.

A utilização de branches contribui para a organização do código e para a integração das funcionalidades desenvolvidas pela equipe.

---

# Atividade — Gestão do Projeto Integrador Interdisciplinar

## Descrição

A atividade prática proposta durante a aula consistiu no planejamento de uma maneira de gerenciar as tarefas do Projeto Integrador Interdisciplinar, utilizando os conceitos apresentados.

Cada grupo deveria organizar o processo de desenvolvimento, estabelecendo mecanismos para acompanhar as atividades e documentar a gestão do projeto.

## Requisitos da atividade

O planejamento deveria contemplar:

* Criação de um backlog;
* Definição de prioridades;
* Organização das tarefas;
* Estimativas das atividades;
* Planejamento de Sprints;
* Criação de um quadro Kanban;
* Organização de branches;
* Definição de critérios de conclusão.

Ao final, o grupo deveria documentar todo o processo em um arquivo Markdown e utilizar o board criado para realizar a gestão do projeto.

## Objetivo

Aplicar os conceitos de gestão de projetos Front-End na organização do Projeto Integrador Interdisciplinar.

A atividade busca melhorar o planejamento, a divisão de responsabilidades, o acompanhamento do progresso e a organização das entregas da equipe.

---

# Repositórios Complementares

Durante a aula, foram disponibilizados os seguintes repositórios para consulta e apoio ao conteúdo:

## Aula Gestão

https://github.com/deivisontakatu/aula-gestao

## Gestão de Produto

https://github.com/deivisontakatu/aula-gestao-produto

## Scrum

https://github.com/deivisontakatu/aula-scrum

---

# Tecnologias e Ferramentas

| Tecnologia ou ferramenta | Utilização                                        |
| ------------------------ | ------------------------------------------------- |
| Git                      | Versionamento do código e utilização de branches. |
| GitHub                   | Armazenamento e colaboração no desenvolvimento.   |
| Markdown                 | Documentação do processo de gestão.               |
| Kanban                   | Visualização e acompanhamento das tarefas.        |
| Scrum                    | Organização do desenvolvimento em Sprints.        |
| Board de tarefas         | Gerenciamento e acompanhamento do projeto.        |

---

# Aprendizados

A Aula 06 permitiu compreender a importância da gestão e do planejamento no desenvolvimento de projetos Front-End.

Entre os principais conhecimentos desenvolvidos estão:

* Importância da gestão de projetos;
* Organização de requisitos;
* Diferença entre requisito, User Story e tarefa;
* Criação e gerenciamento de backlog;
* Definição de prioridades;
* Estimativas de atividades;
* Utilização da Definition of Done;
* Conceitos do Scrum;
* Organização de Sprints;
* Utilização de quadros Kanban;
* Gerenciamento de branches;
* Documentação de projetos utilizando Markdown.

---

# Conclusão

A Aula 06 apresentou conceitos fundamentais para a organização e o gerenciamento de projetos Front-End.

O estudo da gestão de requisitos, backlog, prioridades e estimativas permitiu compreender como transformar uma ideia em atividades organizadas e acompanháveis.

Os conceitos de Scrum, Sprints, Kanban e Definition of Done demonstraram como estruturar o desenvolvimento, acompanhar o progresso e estabelecer critérios para a conclusão das tarefas.

A atividade prática propôs a aplicação desses conhecimentos no Projeto Integrador Interdisciplinar, utilizando ferramentas de gestão e documentação para organizar o trabalho da equipe.

Dessa forma, a aula contribuiu para o desenvolvimento de habilidades de planejamento, organização, colaboração e acompanhamento de projetos de software.

---

# Links

## Repositórios Complementares

Aula Gestão:

https://github.com/deivisontakatu/aula-gestao

Gestão de Produto:

https://github.com/deivisontakatu/aula-gestao-produto

Scrum:

https://github.com/deivisontakatu/aula-scrum

## Repositório Principal da Disciplina

https://github.com/mocotoTonin/senai-frameworks-frontend