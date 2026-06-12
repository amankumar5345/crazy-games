import { z } from "zod";

export const GameCategorySchema = z.enum([
  "Arcade",
  "Puzzle",
  "Strategy",
  "Idle",
  "Action",
  "Simulation"
]);

export type GameCategory = z.infer<typeof GameCategorySchema>;

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  url: string;
  thumbnail: string;
}

import img2048 from "../assets/images/2048.png";
import imgDino from "../assets/images/dino.png";
import imgDogeminer from "../assets/images/dogeminer.png";
import imgBitlife from "../assets/images/bitlife.png";
import imgDough from "../assets/images/dough.png";
import imgBloons1 from "../assets/images/bloons1.png";
import imgBloons2 from "../assets/images/bloons2.png";
import imgBaskets from "../assets/images/baskets.png";
import imgFirewater1 from "../assets/images/firewater1.png";
import imgAgesOfConflict from "../assets/images/ages-of-conflict.png";
import img2048Multi from "../assets/images/2048.png";
import imgEaglercraft from "../assets/images/dino.png";

export const games: Game[] = [
  {
    id: "2048",
    title: "2048",
    description: "Slide tiles to combine them and reach the legendary 2048 tile in this classic logic puzzle.",
    category: "Puzzle",
    url: "https://calculatorgames.github.io/actual/2048/index.html",
    thumbnail: img2048
  },
  {
    id: "dino",
    title: "Dino Run",
    description: "The classic offline t-rex runner. Jump over cacti and dodge pterodactyls to survive.",
    category: "Arcade",
    url: "https://calculatorgames.github.io/actual/extinct/index.html",
    thumbnail: imgDino
  },
  {
    id: "dogeminer",
    title: "Doge Miner",
    description: "To the moon! Mine dogecoins, buy helpers, and build your fortune in this idle clicker.",
    category: "Idle",
    url: "https://calculatorgames.github.io/actual/dogeminer/index.html",
    thumbnail: imgDogeminer
  },
  {
    id: "bitlife",
    title: "BitLife",
    description: "Make life choices and see how your digital story unfolds. Will you be a model citizen or a menace?",
    category: "Simulation",
    url: "https://calculatorgames.github.io/actual/bitlife/index.html",
    thumbnail: imgBitlife
  },
  {
    id: "dough",
    title: "Cookie Dough",
    description: "Bake cookies, unlock upgrades, and watch the numbers go up. Pure idle satisfaction.",
    category: "Idle",
    url: "https://calculatorgames.github.io/actual/dough/index.html",
    thumbnail: imgDough
  },
  {
    id: "bloons1",
    title: "Bloons TD",
    description: "Place monkeys, throw darts, and pop every single balloon that comes down the path.",
    category: "Strategy",
    url: "https://calculatorgames.github.io/actual/bloonstd/index.html",
    thumbnail: imgBloons1
  },
  {
    id: "bloons2",
    title: "Bloons TD 2",
    description: "More monkeys, more bloons, more strategic popping action. The defense continues.",
    category: "Strategy",
    url: "https://calculatorgames.github.io/actual/bloonstd2/index.html",
    thumbnail: imgBloons2
  },
  {
    id: "baskets",
    title: "Basketball Stars",
    description: "Hit the court for fast-paced arcade basketball action. Shoot hoops and score big.",
    category: "Arcade",
    url: "https://calculatorgames.github.io/actual/baskets/index.html",
    thumbnail: imgBaskets
  },
  {
    id: "firewater1",
    title: "Fire & Water 1",
    description: "Control two elemental heroes to solve puzzles and escape the temple together.",
    category: "Puzzle",
    url: "https://calculatorgames.github.io/fireandwater",
    thumbnail: imgFirewater1
  },
  {
    id: "ages-of-conflict",
    title: "Ages of Conflict",
    description: "Observe or control custom nations in a massive world simulation of war and peace.",
    category: "Strategy",
    url: "https://calculatorgames.github.io/actual/ages-of-conflict/index.html",
    thumbnail: imgAgesOfConflict
  },
  {
    id: "2048-multi",
    title: "2048 Multitask",
    description: "Think regular 2048 is too easy? Try playing multiple boards at exactly the same time.",
    category: "Puzzle",
    url: "https://calculatorgames.github.io/actual/2048-multitask",
    thumbnail: img2048Multi
  },
  {
    id: "eaglercraft",
    title: "Eaglercraft",
    description: "A full voxel survival and building experience right in your browser. Mine, craft, survive.",
    category: "Action",
    url: "https://calculatorgames.github.io/e18",
    thumbnail: imgEaglercraft
  }
];
