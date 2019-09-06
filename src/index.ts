import './style.scss';
import { initCanvasCtx } from './game-render';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text changed';
  document.body.appendChild(h1);

  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);

    const img = new Image();
    img.onload = () => {
      // @ts-ignore
      ctx.ctx.drawImage(img, 20 * ctx.wRatio, 20 * ctx.hRatio, 50 * ctx.wRatio,
        50 * ctx.hRatio);
    };
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg';
    // const cartmanImg = new Image();
    // cartmanImg.onload = () => {
    //   // @ts-ignore
    //   ctx.ctx.drawImage(cartmanImg, 50 * ctx.wRatio, 50 * ctx.hRatio, 50 * ctx.wRatio,
    //     50 * ctx.hRatio);
    // };
    // cartmanImg.src = cartman;
}

init();
