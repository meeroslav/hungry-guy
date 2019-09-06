import { GameState } from './game-state';
import { FOOD_SIZE } from './game-food';

export interface Ctx {
  context: CanvasRenderingContext2D;
  wRatio: number;
  hRatio: number;
}

export function initCanvasCtx(canvas: HTMLCanvasElement): Ctx {
  const cWidth = canvas.offsetWidth;
  const cHeight = canvas.offsetHeight;
  const wRatio = cWidth / 100;
  const hRatio = cHeight / 100;

  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  canvas.setAttribute('height', cWidth.toString());
  canvas.setAttribute('width', cHeight.toString());

  return { context, wRatio, hRatio };
}

export function renderState(state: GameState, ctx: Ctx) {
  fillBackground(ctx);
  drawFood(state, ctx);
}

function fillBackground(ctx: Ctx) {
  const grd = ctx.context.createLinearGradient(0, 0, 0, 100 * ctx.hRatio);
  grd.addColorStop(0, '#80c2ff');
  grd.addColorStop(1, '#436caa');
  ctx.context.fillStyle = grd;
  ctx.context.fillRect(0, 0, 100 * ctx.wRatio, 100 * ctx.hRatio);
}

function drawFood(state: GameState, ctx: Ctx) {
  const image = new Image();
  image.onload = () => {
  //   // @ts-ignore
  ctx.context.drawImage(image,
    state.food.foodX * ctx.wRatio,
    state.food.foodY * ctx.hRatio, FOOD_SIZE * ctx.wRatio, FOOD_SIZE * ctx.hRatio);
  };
  image.src = state.food.item.svg;
}
