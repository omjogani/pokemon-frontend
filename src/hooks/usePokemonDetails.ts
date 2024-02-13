import { type PokeType } from '../interfaces/PokeType.ts'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePokemonDetails = (id: number): {
  pokemon: PokeType
  isLoading: boolean
  error: Error | null
} => {
  const [pokemon, setPokemon] = useState<PokeType>({
    url: '',
    weight: 0,
    height: 0,
    name: '',
    abilities: []
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  async function fetchPokemonDetails (): Promise<PokeType> {
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
  }
  useEffect(() => {
    void fetchPokemonDetails().then((data: PokeType) => {
      setPokemon(data)
      setIsLoading(false)
      setError(null)
    }).catch((error: Error | null) => {
      setPokemon({
        url: '',
        weight: 0,
        height: 0,
        name: '',
        abilities: []
      })
      setIsLoading(false)
      setError(error)
    })
  }, [])

  return { pokemon, isLoading, error }
}
