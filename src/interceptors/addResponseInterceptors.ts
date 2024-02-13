import axios, {type AxiosResponse} from 'axios'
import {type PokemonType} from '../interfaces/PokeType.ts'
import {AbilityDetails} from "../interfaces/PokemonAbilityDetails.ts";

export const addResponseInterceptors = (): void => {
    axios.interceptors.response.use((response: AxiosResponse<any, any>): AxiosResponse<any, any> => {
        if (response.config.url !== undefined && response.config.url.startsWith('https://pokeapi.co/api/v2/pokemon/?')) {
            // list of Pokémon
            const responsePokemonData: PokemonType[] = []
            response.data?.results.map((element: PokemonType, index: number) =>
                responsePokemonData.push({
                    id: index,
                    name: element.name,
                    url: element.url
                })
            )

            response.data = responsePokemonData
            return response
        } else {
            // specific one
            const {height, url, weight, name, abilities} = response.data
            console.log({
                height, url, weight, name, abilities
            })

            const abilityDetails: AbilityDetails[] = []
            abilities.map((ele: AbilityDetails) => {
                abilityDetails.push({
                    ability: ele.ability,
                    is_hidden: ele.is_hidden
                })
            })

            response.data = {
                name,
                url,
                weight,
                abilities: abilityDetails,
                height,
            }
            return response
        }
    })
}
