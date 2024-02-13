import {type ReactElement, useCallback, useContext, useEffect, useState} from 'react'
import {type PokemonType} from '../interfaces/PokeType.ts'
import PokeCard from '../components/PokeCard.tsx'
import {usePokemonApi} from '../hooks/usePokemonApi.ts'
import ThemeContext from "../contexts/ThemeContext.ts";

export const Home = (): ReactElement => {
    const {isDarkTheme} = useContext(ThemeContext)
    const {pokemons, isLoading, error} = usePokemonApi(12)
    const [pokemonsToBeDisplay, setPokemonsToBeDisplay] = useState<PokemonType[]>(pokemons)

    useEffect(() => {
        pokemons.map((pokemon: PokemonType, index: number) => pokemon.id = index)
        console.log("come")
    }, [])

    const handleSearch = useCallback((text: string) => {
        if (text != "") {
            const filteredPokemons = pokemonsToBeDisplay.filter((pokemon: PokemonType) =>
                pokemon.name.toLowerCase().includes(text.toLowerCase())
            )
            setPokemonsToBeDisplay(filteredPokemons)
        } else {
            setPokemonsToBeDisplay(pokemons)
        }
    }, [pokemonsToBeDisplay])

    if (error != null) {
        return <div>{error.message}</div>
    }


    return (
        <div>
            {isLoading
                ? <div className="spinner-border text-primary" role="status">
                </div>
                : <div>
                    <div className="my-4 flex justify-center">
                        <input
                            className={` ${isDarkTheme ? 'bg-[#414141] text-white' : 'bg-[#CCCCFF] text-black'} shadow appearance-none rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="username"
                            type="text"
                            placeholder="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {pokemonsToBeDisplay.map((pokemon: PokemonType, index: number) => (
                            <PokeCard key={index} pokemon={{...pokemon, id: pokemon.id + 1}}/>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
