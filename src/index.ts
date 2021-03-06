import './style.scss';
import { drawIntro, initCanvasCtx, preloadImages, renderState } from './game-render';
import { GAME_SPEED, GameState, generateInitialState } from './game-state';
import { fromEvent, interval, merge } from 'rxjs';
import { map, scan, filter, takeWhile, delay, tap } from 'rxjs/operators';
import { calculateState, GameAction, keyToGameAction } from './game-reducer';

function init() {
  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);

  preloadImages()
    .pipe(
      tap(() => drawIntro(ctx)),
      delay(2000)
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
        takeWhile(state => state.gameOn)
      )
      .subscribe((state: GameState) => renderState(state, ctx));
  });
}

init();
