import './style.scss';
import { initCanvasCtx, renderState } from './game-render';
import { GAME_SPEED, GameState, generateInitialState } from './game-state';
import { interval } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { calculateState, GameAction } from './game-actions';

function init() {
  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);

  const ticker$ = interval(GAME_SPEED)
    .pipe(
      map(() => GameAction.MoveDown),
      scan(calculateState, generateInitialState())
    )
    .subscribe(n => renderState(n, ctx));
}

init();
