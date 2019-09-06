import { GameState } from './game-state';
import { FOOD_SIZE } from './game-food';
import { CHEF } from './chef';

const GRD_START_CL = '#4ca1af';
const GRD_END_CL = '#C4E0E5';

const SIZE_OFFSET = 1;

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
  drawChef(state, ctx);
}

function fillBackground(ctx: Ctx) {
  const grd = ctx.context.createLinearGradient(0, 0, 0, 100 * ctx.hRatio);
  grd.addColorStop(0, GRD_START_CL);
  grd.addColorStop(1, GRD_END_CL);
  ctx.context.fillStyle = grd;
  ctx.context.fillRect(0, 0, 100 * ctx.wRatio, 100 * ctx.hRatio);
}

function drawFood(state: GameState, ctx: Ctx) {
  drawImage(state.food.svg, ctx,
    state.foodX * FOOD_SIZE + SIZE_OFFSET, state.foodY * FOOD_SIZE + SIZE_OFFSET,
    FOOD_SIZE - 2 * SIZE_OFFSET, FOOD_SIZE - 2 * SIZE_OFFSET
  );
}

function drawChef(state: GameState, ctx: Ctx) {
  drawImage(CHEF, ctx, state.chefX * FOOD_SIZE - SIZE_OFFSET, 100 - FOOD_SIZE - SIZE_OFFSET,
    FOOD_SIZE + 2 * SIZE_OFFSET, FOOD_SIZE + 2 * SIZE_OFFSET
  );
}

function drawImage(content: string, ctx: Ctx, posX: number, posY: number, width: number, height: number) {
  const image = new Image();
  image.onload = () => {
    //   // @ts-ignore
    ctx.context.drawImage(image,
      posX * ctx.wRatio, posY * ctx.hRatio,
      width * ctx.wRatio, height * ctx.hRatio);
  };
  image.src = content;
}
