import { createContext, useContext } from "react";
interface ThemeContextType {
    theme: string;
    setMyTheme: (theme: string) => void;
  }
  
export const ThemeContext = createContext<ThemeContextType>({
    theme: '',
    setMyTheme: () => {}
});

export const useTheme = () => {
    return useContext(ThemeContext);
}
