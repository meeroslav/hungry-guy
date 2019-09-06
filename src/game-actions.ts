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
  return state;
}
