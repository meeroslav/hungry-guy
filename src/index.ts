import './style.scss';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text changed';
  document.body.appendChild(h1);

  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const cWidth = canvas.offsetWidth;
  const cHeight = canvas.offsetHeight;
  const wRatio = cWidth / 100;
  const hRatio = cHeight / 100;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const img = new Image();
    img.onload = function () {
      // @ts-ignore
      ctx.drawImage(img, 20 * wRatio, 20 * hRatio, 50 * wRatio, 50 * hRatio);
    };
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg';

    canvas.setAttribute('height', cWidth);
    canvas.setAttribute('width', cHeight);
  }
}

init();
