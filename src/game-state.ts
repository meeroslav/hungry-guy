import { ALL_FOOD, Food } from './game-food';

export const MAX_X = 10;
export const MAX_Y = 10;

export interface GameState {
  food?: {
    item: Food;
    foodX: number;
    foodY: number;
  };
  chefX: number;
}

export function generateInitialState(): GameState {
  return {
    chefX: 5,
    food: {
      foodY: -1,
      foodX: Math.floor(Math.random() * MAX_X),
      item: ALL_FOOD[Math.floor(Math.random() * ALL_FOOD.length)]
    }
  };
}
