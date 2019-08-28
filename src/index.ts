import './style.scss';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text changed';
  document.body.appendChild(h1);

  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const img = new Image();
    img.onload = function () {
      // @ts-ignore
      ctx.drawImage(img, 20, 20, 50, 50);
    };
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg';
  }
}

init();
