import { type AbilityDetails } from './PokemonAbilityDetails.ts'

export interface PokemonType {
  id: number
  name: string
  url: string
}

export interface PokeType {
  name: string
  url: string
  height: number
  weight: number
  abilities: AbilityDetails[]
}
