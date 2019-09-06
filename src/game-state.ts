import { ALL_FOOD, Food } from './game-food';

export const MAX_X = 10;
export const MAX_Y = 10;
export const GAME_SPEED = 500;

export interface GameState {
  food: Food;
  foodX: number;
  foodY: number;
  chefX: number;
}

export function generateInitialState(): GameState {
  return {
    chefX: 5,
    food: ALL_FOOD[Math.floor(Math.random() * ALL_FOOD.length)],
    foodY: -1,
    foodX: Math.floor(Math.random() * MAX_X),
  };
}
