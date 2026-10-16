# Microfrontend Remote: Produtos (React + Vite)

Microfrontend React que será carregado em runtime pelo
[host Next.js](https://github.com/DiguinhoLNS/project-react-microfrontend-host) e também roda sozinho (standalone).

## Stack

- React 19 + Vite 8 (Rolldown) + TypeScript
- Yarn 4 (versionado em `.yarn/releases`), Oxlint, Husky + Commitlint

## Rodando local

```bash
yarn install
yarn dev
```

Abra http://localhost:5173.

## Scripts

| Comando | O que faz |
| --- | --- |
| `yarn dev` | Standalone com HMR em http://localhost:5173 |
| `yarn build` | Typecheck + build em `dist/` |
| `yarn preview` | Serve o `dist/` |
| `yarn lint` | Oxlint |

## Commits

[Conventional Commits](https://www.conventionalcommits.org), validados pelo commitlint no hook `commit-msg`
(cabeçalho de até 120 caracteres). Ex.: `feat: adiciona listagem de produtos`.
