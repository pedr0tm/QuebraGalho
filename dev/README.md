# Protótipo navegável · Quebra Galho

Protótipo mobile das duas jornadas do PSF (contratante e prestador), cobrindo as 37 histórias da planilha `PlanejamentoUserStories.xlsx`.

**Como abrir:** pelo celular, ou no navegador do computador com o modo de dispositivo/telefone ligado (Chrome/Edge: `F12` → ícone de celular, ou `Ctrl+Shift+M`). Em tela de computador comum aparece só o aviso "Versão de Computador ainda em Desenvolvimento.".

Os botões tracejados marcados como **Demonstração** simulam a resposta da outra pessoa (ex.: o profissional aceitando) para mostrar o fluxo inteiro.

## Estrutura

```
dev/
├── index.html                  Boas-vindas (início das duas jornadas)
├── cadastro.html, entrar.html, esqueci-senha.html, termos.html
├── inicio.html, notificacoes.html, busca.html, perfil.html, mensagens.html
├── solicitar.html, pedido.html, pedidos.html, conclusao.html, disputa.html
├── pagamento.html, recibo.html, avaliar.html, conta.html
├── prestador-*.html            Jornada do prestador (11 telas)
├── manifest.webmanifest        Permite "Adicionar à tela inicial" no celular
└── assets/
    ├── app.css                 Cores, tipografia e componentes
    ├── app.js                  Ícones e lógica de estado das telas (sem bibliotecas)
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
