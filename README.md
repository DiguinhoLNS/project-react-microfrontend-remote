# Microfrontend Remote: Produtos (React + Vite)

Microfrontend React carregado em runtime pelo
[host Next.js](https://github.com/DiguinhoLNS/project-react-microfrontend-host) e que também roda sozinho (standalone).

## Stack

- React 19 + Vite 8 (Rolldown) + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) (preset `radix-nova`, ícones Lucide)
- React Query (dados de servidor) + Zustand (props recebidas do host)
- Sonner (toasts), API mock com latência e `localStorage`
- Yarn 4 (versionado em `.yarn/releases`), Oxlint, Husky + Commitlint

## Rodando local

```bash
yarn install
yarn dev
```

Abra http://localhost:5173 para o standalone com HMR.

Para testar dentro do host, rode `yarn serve` aqui e `yarn dev` no host, e abra http://localhost:3000/produtos.

## Scripts

| Comando | O que faz |
| --- | --- |
| `yarn dev` | Standalone com HMR em http://localhost:5173 |
| `yarn serve` | Build + preview em http://localhost:4173 (o que o host consome localmente) |
| `yarn build` | Typecheck + build em `dist/` |
| `yarn preview` | Serve o `dist/` em http://localhost:4173 |
| `yarn lint` | Oxlint |

> O host não consome o `yarn dev`: o Vite em dev serve TypeScript não compilado e o preâmbulo do React Refresh,
> que não funcionam dentro de outra página. Para testar integrado, use `yarn serve`.

## Contrato com o host

O host só conhece o módulo ESM `remote-entry.js`. O contrato fica em
[`modules/host/interfaces/IRemoteContract.d.ts`](src/modules/host/interfaces/IRemoteContract.d.ts), espelhado do host.
Mudança incompatível = incrementar `CONTRACT_VERSION` ([`modules/host/constants/contract.ts`](src/modules/host/constants/contract.ts)) nos dois repos.

O [`remote-entry.tsx`](src/remote-entry.tsx) exporta `contractVersion` e `mount(element, props)`. O `mount`:

1. Injeta o `remote.css` no `<head>` (import `?inline`), uma vez só mesmo com várias instâncias.
2. Cria um container `.mfe-root` dentro do elemento do host e aplica o tema (`dark` + `color-scheme`).
3. Guarda as props no [`hostStore`](src/modules/host/store/hostStore.ts) (zustand), de onde qualquer componente lê tema, usuário e `onEvent`.
4. Cria a árvore React com `identifierPrefix` próprio, para os `useId` não colidirem com os do host.

`update(props)` só atualiza o `hostStore` (a troca de tema reaplica a classe no container). `unmount()` desmonta o React,
remove o container e o `<style>` e limpa o store.

O [`main.tsx`](src/main.tsx) (standalone) usa o mesmo `mount`, com `hostName: 'Standalone'` e o tema do sistema.

## Estrutura

Mesma arquitetura do `hwm-web-arch` (camadas por módulo):

```
src/
├── remote-entry.tsx             # contrato: mount / update / unmount
├── main.tsx                     # bootstrap standalone (usa o mesmo mount)
├── styles/                      # remote.css (escopado) e standalone.css
├── components/
│   ├── app/                     # AppProvider (QueryProvider + Toaster)
│   ├── page/PageHeader
│   └── ui/                      # componentes do shadcn
├── modules/
│   ├── api/                     # ApiError, MockApiService, queryClient e queryMeta
│   ├── host/                    # contrato, hostStore, HostController, emitHostEvent
│   └── products/
│       ├── interfaces/  constants/  mocks/
│       ├── services/            # productsService.ts (um método por endpoint)
│       ├── controllers/         # productsController.ts (orquestração, eventos para o host)
│       ├── queries/             # productsQueries.ts e productsMutations.ts
│       └── pages/Products/
└── utils/                       # toast, sleep, storage, info
```

## API mock

[`MockApiService`](src/modules/api/services/mockApiService.ts) simula uma API REST (`get`, `post`, `patch`, `delete` em
`<coleção>` e `<coleção>/<id>`) com latência de 300 a 800 ms e persistência no `localStorage` (chave `mfe-remote:db`).

Ele segue o mesmo contrato do `ApiService` do arch: resolve com o dado ou **lança `ApiError`** (ex.: 404 quando o
registro não existe) e respeita o `signal` do React Query (cancela com `AbortError`). Trocar por um backend real é só
trocar a instância exportada em [`modules/api/index.ts`](src/modules/api/index.ts).

O `localStorage` é por origem: no standalone os dados ficam em `localhost:5173`/`4173` e, dentro do host, na origem do host.
Para voltar aos dados iniciais, apague a chave `mfe-remote:db`.

## Camadas e React Query

Fluxo: `Componente → useXQuery / useXMutation → Controller / Service → apiMock`.

- **Service**: um método por endpoint, repassando o `signal`.
- **Controller**: orquestração fora do React. Ex.: `ProductsController.getProducts` busca a lista e avisa o host (`products:loaded`).
- **Queries**: `productsKeys` (factory de keys), `productsQueries` (`queryOptions`) e `useProductsQuery`.
- **Mutations**: invalidam `productsKeys.all` e enviam o evento ao host (`product:created`, `product:updated`, `product:deleted`).

O [`queryClient`](src/modules/api/query/queryClient.ts) é um singleton (o cache sobrevive entre `unmount` e um novo `mount`):

- `staleTime` de 1 min, sem refetch ao focar a janela.
- Retry só para falha de rede e 5xx. Mutations nunca repetem.
- Toda query ou mutation que falha vira toast de erro. `meta: { silent: true }` desliga, `meta.errorMessage` troca o texto.
- Mutations só notificam sucesso com `meta.successMessage`.

Fora dos requests, use `toast` de [`@/utils/toast`](src/utils/toast/index.ts), nunca `sonner` direto. O `<Toaster />` fica
dentro do `AppProvider`, então renderiza dentro do `.mfe-root` e segue o tema do host.

As devtools do React Query aparecem só no `yarn dev`.

## Como o build funciona

O `vite.config.ts` gera dois entries no mesmo build:

- `index.html` → app standalone
- `src/remote-entry.tsx` → `dist/remote-entry.js` (nome fixo, sem hash), que reexporta `mount` e `contractVersion`
  do chunk com hash em `assets/`

`base: './'` faz os chunks serem resolvidos a partir da URL do `remote-entry.js`, então o bundle funciona em qualquer domínio.
`preserveEntrySignatures: 'exports-only'` mantém os exports do entry (em modo app o Vite os descartaria).
O remote carrega o próprio React (isolado do host), por isso o `chunkSizeWarningLimit` é maior.

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

> **Atenção:** o [`sonner.tsx`](src/components/ui/sonner.tsx) lê o tema do `hostStore` (a CLI gera `useTheme` do `next-themes`).
> Se rodar `add sonner --overwrite`, refaça o ajuste e não instale o `next-themes`.

## Deploy na Vercel

Importe o repo na Vercel (o preset Vite é detectado e a saída é `dist/`). O [`vercel.json`](vercel.json) configura:

- `Access-Control-Allow-Origin: *`, necessário para o `import()` cross-origin do host (restrinja ao domínio do host se quiser)
- `remote-entry.js` sempre revalidado, para o host pegar a versão nova a cada deploy
- `assets/*` com cache imutável (nomes com hash)

Depois, configure no host `NEXT_PUBLIC_REMOTE_PRODUCTS_URL=https://<dominio-de-producao>/remote-entry.js`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org), validados pelo commitlint no hook `commit-msg`
(cabeçalho de até 120 caracteres). Ex.: `feat: adiciona listagem de produtos`.
