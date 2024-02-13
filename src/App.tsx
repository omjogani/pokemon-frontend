import { type ReactElement, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './router/routes.tsx'
import ThemeContext from './contexts/ThemeContext.ts'

export const App = (): ReactElement => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  return (
        <>
            <ThemeContext.Provider value={{
              isDarkTheme,
              setIsDarkTheme
            }}>
                <RouterProvider router={routes}/>
            </ThemeContext.Provider>
        </>
  )
}
