import { type PokemonType } from '../interfaces/PokeType.ts'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePokemonApi = (limit: number): {
  pokemons: PokemonType[]
  isLoading: boolean
  error: Error | null
} => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPokemonData = async (): Promise<PokemonType[]> => {
    console.log(limit)
    // return (await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)).data
    return (await axios.get(`http://localhost:8080/pokemon`)).data
    // return (await axios.get(`http://localhost:3000/v2/pokemon?limit=${limit}`)).data
  }

  useEffect(() => {
    void fetchPokemonData().then((data: PokemonType[]) => {
      console.log(data)
      const map = new Map(Object.entries(data));
      console.log(map)
      setPokemons(data)
      setIsLoading(false)
      setError(null)
    }).catch((error: Error) => {
      setPokemons([])
      setIsLoading(false)
      setError(error)
    })
  }, [])

  return { pokemons, isLoading, error }
}
