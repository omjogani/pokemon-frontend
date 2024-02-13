import {ReactElement, useEffect, useState} from "react";
import type {PokemonType} from "../interfaces/PokeType.ts";
import PokeCard from "../components/PokeCard.tsx";
import axios from "axios";

export const Pagination = (): ReactElement => {
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pokemons, setPokemons] = useState<PokemonType[]>([])

    useEffect(() => {
        pokemons.map((pokemon: PokemonType, index: number) => pokemon.id = index)
        handleChangePagination(true)
    }, [])

    const fetchPokemonData = async (): Promise<PokemonType[]> => {
        return (await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${currentPage * 8}`)).data
    }

    function handleChangePagination(isNext: boolean): void {
        if (isNext) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage - 1)
        }
        setLoading(true)
        fetchPokemonData().then((data: PokemonType[]) => {
            data.map((pokeType: PokemonType, index: number) => pokeType.id = currentPage * 10 + index);
            setPokemons(prev => [...prev, ...data])
        })
        setLoading(false)
    }

    return (
        <div>
            {loading
                ? <div className="spinner-border text-primary" role="status">
                </div>
                : <div>
                    <div className="grid grid-cols-4 gap-4">
                        {pokemons.map((pokemon: PokemonType, index: number) => {
                            if((pokemons.length-index) <= 8) {
                                return (<PokeCard key={pokemon.id+1} pokemon={{...pokemon, id: pokemon.id + 1}}/>)
                            }
                            return <></>;
                        })}
                    </div>
                    <div className="my-4 flex justify-center">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                            onClick={() => handleChangePagination(false)}
                        >
                            Prev
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                            onClick={() => handleChangePagination(true)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
