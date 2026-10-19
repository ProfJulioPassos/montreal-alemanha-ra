# Correção do protótipo — Alemanha | Montreal 2026

## O que mudou

- `modelo.html` agora é um visualizador de maquete 3D com Canvas, sem bibliotecas externas; permite girar e aproximar com o dedo.
- `assets/modelo-canvas.js` (novo): código do modelo 3D independente.
- `assets/portao.js`: seleciona `AFRAME.THREE || window.THREE`, evitando falha por dependência global.
- `ra.html`: mensagem de erro quando bibliotecas de câmera e 3D não carregarem, orientação inicial ajustada e base verde para confirmar detecção do HIRO.
- `cartaz.html`: oferece link direto para a imagem HIRO oficial.
- `teste.html` (novo): mostra se cada arquivo está acessível no GitHub Pages.

## Atualizar o GitHub — sem criar novo repositório

1. Abra o repositório `ProfJulioPassos/montreal-alemanha-ra` no GitHub.
2. Clique em `Code > Add file > Upload files`.
3. Extraia este ZIP em seu computador e envie os **arquivos que estão dentro da pasta**, mantendo a pasta `assets`, nunca somente o ZIP.
4. O GitHub pedirá para substituir os arquivos que já existem. Confirme e finalize em `Commit changes`.
5. Confira se `index.html`, `modelo.html`, `ra.html`, `cartaz.html`, `teste.html` estão na **raiz** do repositório e se os arquivos JS estão em `assets/`.
6. Aguarde a nova implantação em `Actions` ou `Settings > Pages` e atualize o site (Ctrl+Shift+R no computador ou abra em guia anônima no celular).
7. Acesse `https://profjuliopassos.github.io/montreal-alemanha-ra/teste.html` e veja se todos os arquivos estão OK.
8. Abra `https://profjuliopassos.github.io/montreal-alemanha-ra/modelo.html` primeiro. Esta página não precisa da câmera.
9. Depois abra `https://profjuliopassos.github.io/montreal-alemanha-ra/ra.html` usando Safari ou Chrome **no celular**, permita a câmera e aponte para o HIRO em papel ou em outra tela.

### Se o QR Code antigo já estiver impresso

Pode mantê-lo: a URL principal do projeto não mudou. A atualização corrige páginas internas.

### Observações

O HIRO é um marcador diferente do QR Code. O QR abre o site; para ativar a RA, a câmera precisa ENXERGAR o HIRO, impresso no cartaz ou exibido em outro aparelho.
Marcador oficial: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

A realidade aumentada continua dependente de bibliotecas AR.js e A-Frame carregadas da internet, câmera autorizada e suporte do navegador. O visualizador `modelo.html` é autônomo. Não testamos a RA em celulares reais e não podemos garantir compatibilidade universal.
