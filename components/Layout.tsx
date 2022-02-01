import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, green, pink } from "@mui/material/colors";
import React from "react";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

type LayoutProps = { children: React.ReactNode }

export default function Layout({ children }: LayoutProps) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: blueGrey
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}