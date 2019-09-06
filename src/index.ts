import './style.scss';
import { initCanvasCtx, renderState } from './game-render';
import { GameState, generateInitialState } from './game-state';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text changed';
  document.body.appendChild(h1);

  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = initCanvasCtx(canvas);

  const state: GameState = {
    ...generateInitialState()
  };
  state.food.foodY = 5;
  renderState(state, ctx);
}

init();
