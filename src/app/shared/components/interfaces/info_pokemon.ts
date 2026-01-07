import { Ability, Sprite, Type } from "./stats_pokemon";

export interface Pokemon {
    id: number;
    name: string;
    sprites: Sprite;
    height: number;
    weight: number;
    types: Type[];
    base_experience: number;
    abilities: Ability[];
    stats: { base_stat: number; stat: { name: string } }[];
}