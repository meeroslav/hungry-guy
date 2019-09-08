import { ALL_FOOD, Food } from './game-images';

export const MAX_X = 10;
export const MAX_Y = 10;
export const GAME_SPEED = 200;
export const LIVES = 3;

interface FoodState {
  food: Food;
  foodX: number;
  foodY: number;
}

export interface GameState extends FoodState {
  chefX: number;
  score: number;
  lives: number;
}

export function generateInitialState(): GameState {
  return {
    chefX: 5,
    score: 0,
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
