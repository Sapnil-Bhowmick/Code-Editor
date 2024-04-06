import { createContext, useState } from 'react';

import 'codemirror/theme/dracula.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/blackboard.css'


export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [html, setHtml] = useState('');
    const [css, setCSS] = useState('')
    const [js, setJs] = useState('')
   const [theme, setTheme] = useState('dracula')


    return (
        <DataContext.Provider value={{
            html,
            setHtml,
            css,
            setCSS,
            js,
            setJs,
            theme,
            setTheme

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;