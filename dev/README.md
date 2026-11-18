# Protótipo navegável · Quebra Galho

Protótipo navegável (mobile e desktop) das duas jornadas do PSF (contratante e prestador), cobrindo as 37 histórias da planilha `PlanejamentoUserStories.xlsx`.

**Versão:** v0.2.1 (mobile + desktop).

**Como abrir:** é o mesmo endereço no celular e no computador. Abaixo de 900 px de largura aparece o formato de app; a partir de 900 px aparece a versão desktop:

- **Página pública** (`index.html`): busca, categorias, como funciona e chamada para profissionais. No celular, o mesmo endereço abre a tela de boas-vindas do app.
- **Contratante:** barra superior com busca e menu. Os resultados aparecem em grade, e o perfil do profissional tem um cartão de contratação fixo à direita.
- **Prestador:** painel com menu lateral (início, notificações, agenda, ganhos, mensagens, reputação, desempenho).
- **Cadastro e login:** tela dividida, com o painel da marca à esquerda.
- **Mensagens:** caixa de entrada em duas colunas.

Os botões tracejados marcados como **Demonstração** simulam a resposta da outra pessoa (ex.: o profissional aceitando) para mostrar o fluxo inteiro.

## Estrutura

```
dev/
├── index.html                  Página pública (desktop) e boas-vindas (celular)
├── cadastro.html, entrar.html, esqueci-senha.html, termos.html
├── inicio.html, notificacoes.html, busca.html, perfil.html, mensagens.html
├── solicitar.html, pedido.html, pedidos.html, conclusao.html, disputa.html
├── pagamento.html, recibo.html, avaliar.html, conta.html
├── prestador-*.html            Jornada do prestador (11 telas)
├── manifest.webmanifest        Permite "Adicionar à tela inicial" no celular
└── assets/
    ├── app.css                 Cores, tipografia e componentes (base mobile)
    ├── desktop.css             Disposição das telas a partir de 900 px
    ├── app.js                  Ícones, lógica de estado e moldura do desktop (sem bibliotecas)
    └── logo.png, icon-*.png
```

## Identidade visual

| Uso | Cor |
|---|---|
| Laranja da marca (topos, ícones, destaques) | `#EC6F2D` |
| Laranja de botões e links (branco sobre ele: 5,21:1, AA) | `#B84A14` |
| Grafite | `#252525` |
| Cinza de fundo | `#F5F5F5` |
| Branco | `#FFFFFF` |

Fontes: Archivo (títulos) e Figtree (texto), via Google Fonts.

## Interações sem JavaScript novo

Cada tela guarda um pequeno estado em `<body data-state='{...}'>`. Atributos HTML fazem o resto (detalhes no topo de `assets/app.js`):

- `data-set="chave=valor"` grava um valor ao tocar;
- `data-toggle="chave"` liga/desliga; `data-toggle="lista:item"` põe/tira de uma lista;
- `data-show="expressão"` mostra o elemento só quando a expressão vale;
- `data-on="expressão"` marca o botão como selecionado;
- `?chave=valor` na URL muda o estado inicial (ex.: `pedido.html?passo=3`).

## Layouts do desktop

Cada página declara no `<body>` o seu layout (`data-layout`) e o lado do usuário (`data-lado`). O `app.js` usa esses atributos para montar a barra superior, o menu lateral ou o painel da marca:

| `data-layout` | Uso | Páginas |
|---|---|---|
| `landing` | Página pública | `index.html` |
| `auth` | Cadastro e login, tela dividida | `cadastro`, `entrar`, `esqueci-senha`, `prestador-cadastro`, `prestador-evidencias` (e `prestador-agenda?novo=true`) |
| `shell` | Telas principais, largas | `inicio`, `busca`, `pedidos`, `conta`, `prestador-inicio`, `prestador-ganhos`, `prestador-perfil`, `prestador-desempenho`, `prestador-agenda` |
| `aside` | Conteúdo + cartão de ação fixo à direita | `perfil`, `solicitar`, `prestador-pedido`, `prestador-servico` |
| `inbox` | Caixa de entrada | `mensagens` |
| `center` | Fluxos e leitura, coluna central | as demais |
