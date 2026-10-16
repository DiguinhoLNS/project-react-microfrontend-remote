# Microfrontend Remote: Produtos (React + Vite)

Microfrontend React que será carregado em runtime pelo
[host Next.js](https://github.com/DiguinhoLNS/project-react-microfrontend-host) e também roda sozinho (standalone).

## Stack

- React 19 + Vite 8 (Rolldown) + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) (preset `radix-nova`, ícones Lucide)
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

## Estilos dentro do host

O host também usa Tailwind + shadcn, e o CSS do remote é injetado na mesma página. Para os dois conviverem sem um
alterar o outro, o CSS fica dividido em dois arquivos:

| Arquivo | Onde é usado | O que tem |
| --- | --- | --- |
| [`styles/remote.css`](src/styles/remote.css) | host e standalone | theme + utilities do Tailwind, tokens do shadcn. **Sem preflight** |
| [`styles/standalone.css`](src/styles/standalone.css) | só standalone | preflight (reset), fonte Geist e fundo da página |

1. **Sem preflight** no `remote.css`: o reset fica a cargo do host (ou do `standalone.css`).
2. **Tudo escopado em `.mfe-root`**: o plugin `scopeRemoteCss` no [`vite.config.ts`](vite.config.ts) prefixa todas as
   regras de `remote.css` (`.flex-col` vira `.mfe-root .flex-col`) e troca `:root` por `.mfe-root`. Assim o CSS do remote
   não atinge elementos do host, as variáveis do Tailwind/shadcn não sobrescrevem as do host e, dentro do remote,
   as regras do remote vencem as do host em especificidade. Regras aninhadas e `@keyframes` são ignoradas (herdam o escopo do pai).
3. **Tokens do shadcn** ficam em `.mfe-root` (claro) e `.mfe-root.dark` (escuro), não em `:root`/`.dark`.
4. **Fonte herdada**: `--font-sans` e `--font-heading` são `inherit`, então dentro do host o remote usa a fonte do host.

Para conferir o escopo, abra `http://localhost:5173/src/styles/remote.css?inline` com o `yarn dev` rodando:
nenhum seletor de topo pode começar sem `.mfe-root`.

## Adicionando componentes do shadcn

```bash
npx shadcn@latest add <componente>
```

Os arquivos são criados em `src/components/ui` (configuração em [`components.json`](components.json), apontando para o `remote.css`).
Tokens novos vão em `.mfe-root` / `.mfe-root.dark`, nunca em `:root`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org), validados pelo commitlint no hook `commit-msg`
(cabeçalho de até 120 caracteres). Ex.: `feat: adiciona listagem de produtos`.
