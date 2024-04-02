import React from 'react'

import Codemirror from 'codemirror'

import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript.js'

import 'codemirror/theme/dracula.css'

import 'codemirror/addon/edit/closetag'

import 'codemirror/addon/edit/closebrackets'



const Editor = () => {

    React.useEffect(() => {
        Initialize()
    }, [])


    const Initialize = async () => {
        Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
            mode: { name: 'javascript', json: true },
            lineNumbers: true,
            theme: "dracula",
            autoCloseTags: true,
            autocloBrackets: true

        })
    }


    return (
        <div>
            <textarea id="realtimeEditor"> </textarea>
        </div>
    )
}

export default Editor
