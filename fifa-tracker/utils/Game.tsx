import { Player } from "./Player"

export type Game = {
    id?: number,
    members1: Player[],
    members2: Player[],
    score1: number,
    score2: number,
    date: string
}