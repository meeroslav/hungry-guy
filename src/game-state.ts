import { ALL_FOOD, Food } from './game-images';

export const MAX_X = 10;
export const MAX_Y = 10;
export const GAME_SPEED = 100;
export const LIVES = 3;

interface FoodState {
  food: Food;
  foodX: number;
  foodY: number;
}

export interface GameState extends FoodState {
  chefX: number;
  score: number;
  foodCollected: number;
  lives: number;
  gameOn: boolean;
}

export function generateInitialState(): GameState {
  return {
    gameOn: true,
    chefX: Math.round(MAX_X / 2),
    score: 0,
    foodCollected: 0,
    lives: LIVES,
    ...generateFoodItem()
  };
}

export function generateFoodItem(): FoodState {
  return {
    food: ALL_FOOD[Math.floor(Math.random() * ALL_FOOD.length)],
    foodY: -1,
    foodX: Math.floor(Math.random() * MAX_X),
  };
}
