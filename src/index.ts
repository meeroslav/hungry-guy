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
    .pipe(
      debounceTime(2000)
    )
    .subscribe(() => {

    const keyDown$ = fromEvent(document, 'keydown')
      .pipe(
        map(keyToGameAction),
        filter(Boolean)
      );

    const timer$ = interval(GAME_SPEED)
      .pipe(map(() => GameAction.MoveDown));

    merge(timer$, keyDown$)
      .pipe(
        scan(calculateState, generateInitialState()),
        withLatestFrom(interval(0, animationFrameScheduler), (state, _) => state),
        takeWhile(state => state.gameOn)
      )
      .subscribe(state => {
        renderState(state, ctx)
      });

  });
}

init();
