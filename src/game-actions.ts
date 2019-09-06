import { GameState } from './game-state';

export enum GameAction {
  MoveDown = 'MoveDown',
  ChefLeft = 'ChefLeft',
  ChefRight = 'ChefRight'
}

export function calculateState(state: GameState, action: GameAction): GameState {
  if (action === GameAction.MoveDown) {
    return { ...state, foodY: state.foodY + state.food.speed }
  }
  if (action === GameAction.ChefLeft) {
    return { ...state, chefX: state.chefX - 1 }
  }
  if (action === GameAction.ChefRight) {
    return { ...state, chefX: state.chefX + 1 }
  }
  return state;
}
