import { createContext } from 'react'

interface ThemeContextProps {
  isDarkTheme: boolean
  setIsDarkTheme: (isDarkTheme: boolean) => void
}

export default createContext<ThemeContextProps>({
  isDarkTheme: false,
  setIsDarkTheme: () => {}
})
