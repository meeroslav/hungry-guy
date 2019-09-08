import { GameState } from './game-state';
import { ALL_FOOD, BASKET, CHEF, Drawable, FOOD_SIZE, GAME_OVER, INTRO, LIFE } from './game-images';
import { combineLatest, Observable, fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

const GRD_START_CL = '#4ca1af';
const GRD_END_CL = '#C4E0E5';
const TEXT_CL = '#242122';

const RXJS_CL_DARK = '#5C2E88';
const RXJS_CL_LIGHT = '#ED168F';

const SIZE_OFFSET = 1;
const LIFE_SIZE = 6;
const BASKET_SIZE = 12;
const BASKET_OFFSET = BASKET_SIZE / FOOD_SIZE;

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

  drawIntro({ context, wRatio, hRatio });

  return { context, wRatio, hRatio };
}

export function preloadImages(): Observable<any> {
  return combineLatest([
    ...ALL_FOOD.map(loadImage),
    loadImage(CHEF),
    loadImage(BASKET),
    loadImage(LIFE),
    loadImage(INTRO),
    loadImage(GAME_OVER)
  ])
    .pipe(debounceTime(1000));
}

export function renderState(state: GameState, ctx: Ctx) {
  fillBackground(ctx);
  if (state.lives) {
    drawChef(state, ctx);
    drawFood(state, ctx);
    drawBasket(state, ctx);
    drawLives(state, ctx);
    drawScore(state, ctx);
  } else {
    drawGameOver(state, ctx);
  }
}

function fillBackground(ctx: Ctx) {
  const grd = ctx.context.createLinearGradient(0, 0, 0, 100 * ctx.hRatio);
  grd.addColorStop(0, GRD_START_CL);
  grd.addColorStop(1, GRD_END_CL);
  ctx.context.fillStyle = grd;
  ctx.context.fillRect(0, 0, 100 * ctx.wRatio, 100 * ctx.hRatio);
}

function drawIntro(ctx: Ctx) {
  drawImage(INTRO, ctx,
    10, 10,
    80, 80
  );
}

function drawFood(state: GameState, ctx: Ctx) {
  drawImage(state.food, ctx,
    state.foodX * FOOD_SIZE + SIZE_OFFSET, state.foodY * FOOD_SIZE + SIZE_OFFSET,
    FOOD_SIZE - 2 * SIZE_OFFSET, FOOD_SIZE - 2 * SIZE_OFFSET
  );
}

function drawChef(state: GameState, ctx: Ctx) {
  drawImage(CHEF, ctx,
    state.chefX * FOOD_SIZE, 100 - FOOD_SIZE,
    FOOD_SIZE, FOOD_SIZE
  );
}

function drawBasket(state: GameState, ctx: Ctx) {
  drawImage(BASKET, ctx,
    state.chefX * FOOD_SIZE - SIZE_OFFSET, 100 - (BASKET_OFFSET * state.foodY),
    BASKET_SIZE, BASKET_SIZE
  );
}

function drawLives(state: GameState, ctx: Ctx) {
  for (let i = 0; i < state.lives; i++) {
    const posX = i * (LIFE_SIZE + SIZE_OFFSET) + SIZE_OFFSET;

    drawImage(LIFE, ctx, posX, SIZE_OFFSET, LIFE_SIZE, LIFE_SIZE);
  }
}

function drawScore(state: GameState, ctx: Ctx) {
  // draw score
  ctx.context.font = `${ctx.wRatio * 6}px Arial`;
  ctx.context.textAlign = 'right';
  ctx.context.fillStyle = TEXT_CL;
  ctx.context.fillText(state.score.toString(), (100 - SIZE_OFFSET) * ctx.wRatio, ctx.hRatio * 6);
}

function drawGameOver(state: GameState, ctx: Ctx) {
  drawImage(GAME_OVER, ctx, 5, 40, 90, 15);

  ctx.context.font = `${ctx.wRatio * 6}px Arial`;
  ctx.context.textAlign = 'center';
  ctx.context.fillStyle = RXJS_CL_DARK;
  ctx.context.fillText(`${state.score} points`, 50 * ctx.wRatio, 60 * ctx.hRatio);
}

function drawImage(drawable: Drawable, ctx: Ctx, posX: number, posY: number, width: number, height: number) {
  if (drawable.image) {
    ctx.context.drawImage(drawable.image,
      posX * ctx.wRatio, posY * ctx.hRatio,
      width * ctx.wRatio, height * ctx.hRatio
    );
  } else {
    const image = new Image();
    image.onload = () => {
      //   // @ts-ignore
      ctx.context.drawImage(image,
        posX * ctx.wRatio, posY * ctx.hRatio,
        width * ctx.wRatio, height * ctx.hRatio
      );
    };
    image.src = drawable.svg;
  }
}

function loadImage(item: Drawable): Observable<Event> {
  const image = new Image();
  image.src = item.svg;
  return fromEvent(image, 'load')
    .pipe(tap(event => item.image = event.target as HTMLImageElement));
}
