import './style.scss';
import { initCanvasCtx } from './game-render';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text changed';
  document.body.appendChild(h1);

  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctxModel = initCanvasCtx(canvas);

    const grd = ctxModel.ctx.createLinearGradient(0, 0, 0, 100 * ctxModel.hRatio);
    grd.addColorStop(0, '#80c2ff');
    grd.addColorStop(1, '#436caa');

// Fill with gradient
    ctxModel.ctx.fillStyle = grd;
    ctxModel.ctx.fillRect(0, 0, 100 * ctxModel.wRatio, 100 * ctxModel.hRatio);

    const img = new Image();
    img.onload = () => {
      // @ts-ignore
      ctxModel.ctx.drawImage(img, 20 * ctxModel.wRatio, 20 * ctxModel.hRatio, 50 * ctxModel.wRatio,
        50 * ctxModel.hRatio);
    };
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg';
    // const cartmanImg = new Image();
    // cartmanImg.onload = () => {
    //   // @ts-ignore
    //   ctxModel.ctx.drawImage(cartmanImg, 50 * ctxModel.wRatio, 50 * ctxModel.hRatio, 50 * ctxModel.wRatio,
    //     50 * ctxModel.hRatio);
    // };
    // cartmanImg.src = cartman;
}

init();
