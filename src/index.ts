import './style.scss';
import { initCanvasCtx, renderState } from './game-render';
import { GameState, generateInitialState } from './game-state';

function init() {
  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);

  const state: GameState = {
    ...generateInitialState()
  };
  state.food.foodY = 5;
  renderState(state, ctx);
}

init();
