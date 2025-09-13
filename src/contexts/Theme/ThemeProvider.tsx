import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const setMyTheme = (newTheme: string) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    };
    
    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
    }, [theme]
    )
    
    return (
        <ThemeContext.Provider value={{ theme, setMyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;