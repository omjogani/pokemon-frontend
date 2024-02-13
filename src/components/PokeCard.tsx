import { type ReactElement, useContext } from 'react'
import { type PokemonType } from '../interfaces/PokeType.ts'
import { useNavigate } from 'react-router-dom'
import ThemeContext from '../contexts/ThemeContext.ts'

interface PokeCardProps {
  pokemon: PokemonType
}

function PokeCard (pokeObj: PokeCardProps): ReactElement {
  const { isDarkTheme } = useContext(ThemeContext)

  const navigate = useNavigate()
  return (
        <>
            <div
                className="card shadow-lg rounded p-4 text-center"
                style={{ width: '18rem', margin: '5px auto', backgroundColor: isDarkTheme ? '#414141' : 'white', color: isDarkTheme ? 'white' : 'black' }}
                onClick={() => { navigate(`${pokeObj.pokemon.id}`) }}
            >
                <img
                    src={pokeObj.pokemon.url}
                    className="card-img-top"
                    alt={pokeObj.pokemon.url}
                />
                <div className="card-body">
                    <h5 className="font-bold text-lg">{pokeObj.pokemon.name}</h5>
                    <ul className="list-group list-group-flush">
                        <a href={''} className="text-decoration-none text-blue-500">
                            Link
                        </a>
                    </ul>
                </div>
            </div>
        </>
  )
}

export default PokeCard
