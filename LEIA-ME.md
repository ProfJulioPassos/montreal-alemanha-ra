# 🇩🇪 Protótipo de Realidade Aumentada — Alemanha | Colégio Montreal 2026

**O que é:** website estático e gratuito com uma experiência de realidade aumentada por marcador, uma maquete 3D explorável e uma página para impressão do cartaz com QR Code.

**IMPORTANTE — Como funciona sobre o painel:** nesta versão, o sistema **não reconhece a foto do Portão de Brandemburgo que aparece no painel original**. Ele reconhece o **marcador oficial HIRO** (quadrado com borda preta) que você imprime e cola ao lado, ou sobre uma área reservada, do painel. Isso é mais fácil de testar e mais confiável do que rastrear uma foto pequena. Para reconhecimento direto da foto, precisamos de uma imagem digital original nítida do painel e de uma versão com rastreamento por imagem, que é outro projeto.

## O que está incluído

- `index.html`: página de boas-vindas; aberta pelo QR Code.
- `ra.html`: câmera + reconhecimento do marcador HIRO + maquete digital do Portão de Brandemburgo.
- `modelo.html`: visualizador 3D que funciona sem câmera, com rotação por toque e zoom.
- `cartaz.html`: cartaz A4 para impressão com marcador oficial HIRO e QR Code para a URL publicada.
- `assets/portao.js`: construção 3D original com seis colunas por fileira, cinco passagens e Quadriga **estilizada**.
- `assets/style.css`: identidade visual responsiva.
- `.nojekyll`: impede tratamento desnecessário do GitHub Pages via Jekyll.

## Como publicar grátis no GitHub Pages (aproximadamente 10–20 minutos)

1. Acesse https://github.com e entre com uma conta. Se não tiver, crie uma conta gratuita.
2. Clique em **New repository**, use por exemplo `montreal-alemanha-ra`, selecione **Public** e crie o repositório.
3. No novo repositório, escolha **Add file → Upload files** e envie **os arquivos e a pasta `assets` contidos no ZIP**, de forma que `index.html` fique na raiz do repositório. Faça commit.
4. Acesse **Settings → Pages → Build and deployment**. Escolha **Deploy from a branch**, `main`, `/(root)` e **Save**.
5. Após a publicação, o site ficará em uma URL do tipo:
   `https://SEU-USUARIO.github.io/montreal-alemanha-ra/`
   Esse é o endereço a ser compartilhado, não o link do GitHub para o código.
6. Abra a URL no computador, teste a tela inicial e a opção `Explorar modelo 3D`.
7. Abra `https://SEU-USUARIO.github.io/montreal-alemanha-ra/cartaz.html` **DEPOIS da publicação**. O cartaz gera o QR Code apontando para seu endereço real. Espere carregar também a imagem oficial do marcador HIRO e imprima em papel A4, escala 100%.
8. Coloque o cartaz ao lado do painel da Alemanha, onde haja iluminação e espaço para apontar o celular. O mesmo QR pode ser reproduzido em outros pontos da sala.
9. Em um celular, escaneie o QR Code, toque em **Iniciar Realidade Aumentada**, autorize o uso da câmera e aponte para o **marcador HIRO**. Se o modelo ficar orientado de forma inadequada no painel vertical, toque em **Ajustar orientação**.

## Requisitos de funcionamento

- **Internet** durante a experiência: as bibliotecas A-Frame e AR.js vêm de CDN e o site precisa estar acessível.
- **HTTPS**: o GitHub Pages oferece. Abrir diretamente `ra.html` como arquivo local (`file://`) não é um teste válido no celular.
- **Permissão da câmera**: solicitada pelo navegador ao abrir RA. Sem ela, use `modelo.html`.
- **Navegadores**: começar pelos navegadores atuais Chrome/Android e Safari/iPhone. Alguns browsers internos de WhatsApp/Instagram podem bloquear ou alterar a câmera; nesses casos, abrir no navegador externo.
- **Marcador impresso**: imagem oficial HIRO, sem distorções, sem dobra, com borda preta e área branca ao redor. Melhor em papel fosco, sem reflexos. Ao testar, tente distâncias de 20 a 50 cm e ajuste conforme câmera/impressão.
- **QR Code e marcador têm funções DIFERENTES**. O QR abre o site; o HIRO fixa a posição do modelo 3D na câmera. Eles podem ser impressos no mesmo cartaz, mas devem permanecer claramente separados.

## Como conferir se o QR Code está correto

Antes de imprimir, escaneie o QR Code do `cartaz.html` aberto **no GitHub Pages** e confirme que ele abre a página inicial do endereço publicado. Não imprima a versão local `file://` porque geraria um QR inválido no celular de outros visitantes.

## Como adaptar para outras salas

Duplique o projeto, personalize os títulos, informações e construa outro modelo no arquivo JS para o monumento escolhido. O marcador HIRO pode ser usado em todas as salas se cada sala tiver URL de site e modelo próprios. Para usar reconhecimento direto de imagens impressas, é preciso outro mecanismo (rastreamento de imagens NFT/MindAR) e boa imagem base.

## Limitações honestas do protótipo

- A maquete foi criada com geometrias estilizadas. Não é um escaneamento real nem reprodução detalhada do monumento.
- Foi realizada **verificação estática da estrutura e scripts**, mas a experiência **precisa ser testada em aparelhos físicos, após publicação**. Não é possível assegurar 100% de compatibilidade com todos os celulares.
- A rastreabilidade depende de iluminação, câmera, tamanho e foco do marcador. Se necessário, testar o modo de orientação.
- Uso público no GitHub Pages; **não** insira nomes/dados de alunos nem fotos privadas. Esta aplicação não solicita cadastro.
- A experiência não captura nem envia imagens para uma conta da escola; as bibliotecas de câmera rodam no navegador. Links externos/CDN recebem as solicitações normais de acesso aos arquivos.

## Conteúdo pedagógico

- Construído de 1788 a 1791 por Carl Gotthard Langhans.
- Inspirado na arquitetura da Grécia Antiga.
- Tem duas fileiras com seis colunas e cinco passagens.
- Quadriga instalada em 1793, com quatro cavalos e a deusa Vitória.
- Símbolo da reunificação alemã após 1989.

Fonte: https://www.visitberlin.de/en/brandenburg-gate

## Tecnologia e documentação

- AR.js (rastreamento por marcador): https://github.com/AR-js-org/AR.js
- A-Frame: https://aframe.io/
- Marcador HIRO oficial: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
- HTTPS e câmera: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- Publicar GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Licença do código **original deste protótipo**: MIT. Bibliotecas externas obedecem às respectivas licenças. É um projeto educativo não oficial, sem associação com os mantenedores das bibliotecas.
