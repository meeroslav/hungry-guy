import { GameState, MAX_X } from './game-state';
import { ALL_FOOD } from './game-images';

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
  // GAME OVER: no more changes
  if (!state.lives) {
    return state;
  }
  // OTHERWISE
  if (action === GameAction.MoveDown) {
    const foodY = state.foodY + state.food.speed;
    if (foodY === 9 && state.foodX === state.chefX) {
      return {
        ...state,
        score: state.score + state.food.speed * 40,
        food: ALL_FOOD[Math.floor(Math.random() * ALL_FOOD.length)],
        foodY: -1,
        foodX: Math.floor(Math.random() * MAX_X)
      };
    }
    if (foodY === 9 && state.foodX !== state.chefX) {
      return { ...state, foodY, lives: state.lives - 1 };
    }
    if (foodY === 10) {
      return {
        ...state,
        food: ALL_FOOD[Math.floor(Math.random() * ALL_FOOD.length)],
        foodY: -1,
        foodX: Math.floor(Math.random() * MAX_X),
      }
    }
    return { ...state, foodY }
  }
  if (action === GameAction.ChefLeft && state.chefX > 0) {
    return { ...state, chefX: state.chefX - 1 }
  }
  if (action === GameAction.ChefRight && state.chefX < MAX_X - 1) {
    return { ...state, chefX: state.chefX + 1 }
  }
  return state;
}
