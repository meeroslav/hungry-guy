import { GameState, MAX_X } from './game-state';

export enum GameAction {
  MoveDown = 'MoveDown',
  ChefLeft = 'ChefLeft',
  ChefRight = 'ChefRight'
}

export function keyToGameAction(event: KeyboardEvent): GameAction {
  if (event.code === 'ArrowLeft') {
    return GameAction.ChefLeft;
  }
  if (event.code === 'ArrowRight') {
    return GameAction.ChefRight;
  }
  if (event.code === 'ArrowDown') {
    return GameAction.MoveDown;
  }
  return null;
}

export function calculateState(state: GameState, action: GameAction): GameState {
  if (action === GameAction.MoveDown) {
    return { ...state, foodY: state.foodY + state.food.speed }
  }
  if (action === GameAction.ChefLeft && state.chefX > 0) {
    return { ...state, chefX: state.chefX - 1 }
  }
  if (action === GameAction.ChefRight && state.chefX < MAX_X - 1) {
    return { ...state, chefX: state.chefX + 1 }
  }
  return state;
}
