import { GameState, generateFoodItem, MAX_X, MAX_Y } from './game-state';

export enum GameAction {
  MoveDown = 'MoveDown',
  ChefLeft = 'ChefLeft',
  ChefRight = 'ChefRight'
}

const SCORE_MULTIPLIER = 40;
const SPEED_MULTIPLIER = .5;

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
  if (!state.gameOn) {
    return state;
  }
  // FINISH GAME if no more lives
  if (!state.lives) {
    return { ...state, gameOn: false };
  }
  // OTHERWISE
  if (action === GameAction.MoveDown) {
    const foodY = state.foodY + state.food.speed * SPEED_MULTIPLIER;
    if (foodY === MAX_Y - 1) {
      // INCREASE SCORE
      if (state.foodX === state.chefX) {
        return {
          ...state, foodY,
          score: state.score + state.food.speed * SCORE_MULTIPLIER,
          foodCollected: state.foodCollected + 1
        };
      }
      // LIFE LOST
      return { ...state, foodY, lives: state.lives - 1 };
    }
    // MAKE NEW FOOD
    if (foodY === MAX_Y) {
      return { ...state, ...generateFoodItem() }
    }
    return { ...state, foodY }
  }
  if (action === GameAction.ChefLeft && state.chefX > 0) {
    const chefX = state.chefX - 1;
    return { ...state, chefX, foodX: calculateFoodX(state, chefX) }
  }
  if (action === GameAction.ChefRight && state.chefX < MAX_X - 1) {
    const chefX = state.chefX + 1;
    return { ...state, chefX, foodX: calculateFoodX(state, chefX) }
  }
  return state;
}

// Move food together with Chef, if already added to the basket
function calculateFoodX(state: GameState, newChefX: number): number {
  if (state.foodY >= 9 && state.foodX === state.chefX) {
    return newChefX;
  }
  return state.foodX;
}
