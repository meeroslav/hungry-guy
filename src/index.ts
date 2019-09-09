import './style.scss';
import { drawIntro, initCanvasCtx, preloadImages, renderState } from './game-render';
import { GAME_SPEED, generateInitialState } from './game-state';
import { animationFrameScheduler, fromEvent, interval, merge } from 'rxjs';
import { map, scan, withLatestFrom, filter, takeWhile, debounceTime } from 'rxjs/operators';
import { calculateState, GameAction, keyToGameAction } from './game-reducer';

function init() {
  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);
  drawIntro(ctx);

  preloadImages()
    .pipe(debounceTime(1000))
    .subscribe(() => {

    const ticker$ = interval(GAME_SPEED)
      .pipe(
        map(() => GameAction.MoveDown)
      );

    const keyDown$ = fromEvent(document, 'keydown')
      .pipe(
        map(keyToGameAction),
        filter(Boolean)
      );

    const gameState$ = merge(ticker$, keyDown$)
      .pipe(
        scan(calculateState, generateInitialState()),
        takeWhile(state => state.gameOn)
      );

    gameState$
      .pipe(
        withLatestFrom(interval(0, animationFrameScheduler), (state, _) => state)
      )
      .subscribe(state => renderState(state, ctx))

  });
}

init();
