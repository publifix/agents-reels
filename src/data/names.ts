import { random } from "remotion";

export const femaleNames: string[] = [
  "Maria",
  "Guadalupe",
  "Fernanda",
  "Daniela",
  "Ximena",
  "Valeria",
  "Alejandra",
  "Monica",
  "Paola",
  "Karla",
  "Renata",
  "Itzel",
];

export const maleNames: string[] = [
  "Jose",
  "Luis",
  "Carlos",
  "Miguel",
  "Alejandro",
  "Eduardo",
  "Ricardo",
  "Fernando",
  "Diego",
  "Roberto",
  "Emiliano",
  "Santiago",
];

export type ClientGender = "female" | "male";

export const getRandomName = (gender: ClientGender): string => {
  const pool = gender === "female" ? femaleNames : maleNames;
  return pool[Math.floor(random(null) * pool.length)];
};
