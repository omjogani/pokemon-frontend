import {type ReactElement, useContext} from 'react'
import {type AbilityDetails} from '../interfaces/PokemonAbilityDetails.ts'
import {usePokemonDetails} from '../hooks/usePokemonDetails.ts'
import {useNavigate, useParams} from 'react-router-dom'
import ThemeContext from '../contexts/ThemeContext.ts'

export const PokeDetails = (): ReactElement => {
    const {id} = useParams()
    const {isDarkTheme} = useContext(ThemeContext)
    const navigate = useNavigate()
    const {pokemon, isLoading, error} = usePokemonDetails(+(id ?? 0))
    if (error != null) {
        return <div>{error.message}</div>
    }
    return <>
        {isLoading
            ? <div className="spinner-border text-primary" role="status">
            </div>
            :
            <div className="h-screen flex items-center justify-center">
                <div
                    className="text-center justify-center rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                    style={{backgroundColor: isDarkTheme ? '#414141' : 'white', color: isDarkTheme ? 'white' : 'black'}}
                >
                    <div className="flex justify-center">
                        <img
                            className="rounded-t-lg w-1/2 flex flex-row justify-center text-center"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                            alt={pokemon.name}/>
                    </div>
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight">
                            {pokemon.name}
                        </h5>
                        <p className="mb-4 text-base">
                            Height: {pokemon.height} | Weight: {pokemon.weight}
                            {pokemon.abilities.map((ab: AbilityDetails, index: number) => (
                                <span key={index}>{ab.ability.name}, </span>))
                            }
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-block bg-blue-400 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-color="light">
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        }
    </>
}
