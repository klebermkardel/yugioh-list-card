# Yu-Gi-Oh! Cards List

Uma aplicação web moderna, performática e totalmente responsiva desenvolvida para consultar o catálogo completo de cartas do universo Yu-Gi-Oh! utilizando a API oficial da YGOPRODeck.

---

## Demonstração Visual

A aplicação combina uma interface temática inspirada na identidade visual do card game com uma experiência de uso fluida e otimizada.

*   **Interface Principal:** Grid responsivo exibindo as artes originais das cartas.
*   **Modal de Detalhes:** Visualização expandida contendo o nome completo, tipo e a descrição detalhada dos efeitos de cada carta.

---

## Funcionalidades Aplicadas

O projeto foi construído focando em boas práticas de arquitetura front-end e otimização de performance (UX/DX):

*   **Busca Global via API (Assíncrona):** O campo de pesquisa realiza consultas dinâmicas diretamente no banco de dados da API utilizando o parâmetro `fname`. Isso permite encontrar instantaneamente qualquer uma das mais de 13.000 cartas existentes, mesmo que elas não estejam carregadas na memória local inicial.
*   **Filtro por Categoria Inteligente:** Utilização da estrutura de dados `Set` do JavaScript para mapear as cartas carregadas e gerar dinamicamente as opções de tipos no menu select, eliminando duplicatas de forma nativa.
*   **Paginação Remota On-Demand ("Carregar Mais"):** Inicialização leve trazendo apenas 50 registros por vez via parâmetros `num` e `offset`. O usuário pode navegar de forma infinita consumindo os dados sob demanda, evitando o travamento do navegador e economizando dados.
*   **Mecanismo de Debounce:** Técnica implementada no campo de texto para adiar a execução da busca em 300ms. Evita que dezenas de requisições desnecessárias sejam disparadas ao servidor enquanto o usuário digita rapidamente.
*   **Feedback Visual de Loading:** Um spinner estilizado em CSS puro com animações de rotação (`@keyframes`) que indica visualmente o progresso das requisições assíncronas em conexões mais lentas.

---

## Tecnologias e Conceitos Utilizados

| Tecnologia / Conceito | Aplicação no Projeto |
| :--- | :--- |
| **HTML5** | Estruturação semântica da aplicação e elementos de formulário. |
| **CSS3 (Grid & Flexbox)** | Posicionamento responsivo dos cards em malha estruturada e centralização do modal. |
| **JavaScript Assíncrono** | Uso extensivo de `Async/Await`, `fetch` e manipulação de Promises para comunicação com o servidor. |
| **Manipulação Ativa do DOM** | Criação dinâmica de elementos HTML através de loops (`forEach`, `map`) e injeção controlada de nós. |
| **Conventional Commits** | Histórico de versionamento rigorosamente organizado com prefixos claros (`feat:`, `fix:`, `style:`, `perf:`). |

---

## Estrutura de Arquivos

```text
├── index.html          # Estrutura principal da aplicação e modais
├── css/
│   ├── styles.css      # Estilizações globais, reset e variáveis de cores
│   └── cards.css       # Estilos específicos do grid, animação do spinner e botão
└── js/
    ├── api.js          # Módulo isolado de consumo de dados (fetch)
    └── app.js          # Lógica de controle do DOM, filtros, paginação e eventos
```

## Como Executar Localmente

Como o projeto utiliza Módulos nativos do JavaScript (```import/export```), os navegadores bloqueiam a execução direta abrindo o arquivo index.html via protocolo de arquivo local (```file://```). É necessário rodar o projeto através de um servidor local.

1. Clone o repositório

```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
```

2. Acesse a pasta do projeto:

```bash
cd seu-repositorio
```

3. Inicie um servidor local: 

    * Se você usa o **VS Code**, basta instalar a extensão **Live Server**, clicar com o botão direito no ```index.html``` e selecionar *Open with Live Server*.

    * Ou via terminal usando Python (caso tenha instalado):

    ```bash
    python -m http.server 8000
    ```

### Nota de Desenvolvimento: 

Este projeto foi construído de forma iterativa utilizando Git de ponta a ponta, simulando um ambiente real de desenvolvimento ágil onde refatorações de performance e experiência do usuário foram aplicadas em ramificações dedicadas.