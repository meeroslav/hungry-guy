import './style.scss';
import { initCanvasCtx, renderState } from './game-render';
import { GAME_SPEED, GameState, generateInitialState } from './game-state';
import { fromEvent, interval, merge } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { calculateState, GameAction, keyToGameAction } from './game-actions';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';

function init() {
  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);

  const ticker$ = interval(GAME_SPEED)
    .pipe(
      map(() => GameAction.MoveDown)
    );

  const keyDown$ = fromEvent(document, 'keydown')
    .pipe(
      map(keyToGameAction),
      filter(Boolean)
    );

  merge(ticker$, keyDown$)
    .pipe(
      scan(calculateState, generateInitialState())
    )
    .subscribe(n => renderState(n, ctx))
}

init();
