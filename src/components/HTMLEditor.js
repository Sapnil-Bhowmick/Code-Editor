import React from 'react'

import Codemirror from 'codemirror'

import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/htmlembedded/htmlembedded.js'

// import 'codemirror/theme/dracula.css'

import 'codemirror/addon/edit/closetag'

import 'codemirror/addon/edit/closebrackets'

import { DataContext } from '../context/codecontext'

import ACTIONS from '../Actions/Actions'






const HTMLEditor = ({ socketRef, roomId, onCodeChange }) => {


    const { setHtml, theme } = React.useContext(DataContext)
    const HTMLeditorRef = React.useRef(null)




    React.useEffect(() => {
        Initialize()
        persistCode()
    }, [])



    React.useEffect(() => {
        // console.log('socketRef.current' , socketRef.current)
        if (socketRef.current) {
            
            socketRef.current.on(ACTIONS.HTML_CODE_CHANGE, ({ code }) => {
                // console.log('code' , code)
                if (code !== null) {
                    HTMLeditorRef.current.setValue(code);
                    localStorage.setItem("HTML", code)
                }
            });

        }

        return () => {
            socketRef.current.off(ACTIONS.HTML_CODE_CHANGE);
        };
    }, [socketRef.current]);




    const persistCode = () => {
        if (localStorage.getItem("HTML")) {
            // console.log('Storage Code')
            HTMLeditorRef.current.setValue(localStorage.getItem("HTML"));
        }

    }



    const Initialize = async () => {
        HTMLeditorRef.current = Codemirror.fromTextArea(document.getElementById('HTMLrealtimeEditor'), {
            mode: { name: 'htmlembedded' },
            lineWrapping: true,
            showCursorWhenSelecting: true,
            dragDrop: true,
            spellcheck: true,
            lineNumbers: true,
            theme: theme,
            autoCloseTags: true,
            autocloBrackets: true

        })

        //  * 'change' : event name in codemirror fired for any change in editor
        HTMLeditorRef.current.on('change', (instance, changes) => {
            // console.log('changes' , changes)
            // * origin gives the type of action performed in changes object
            const { origin } = changes

            //  * Get the content of the current editor document.
            const code = instance.getValue()
            localStorage.setItem("HTML", code)
            onCodeChange(code)
            setHtml(code)

            if (origin !== "setValue") {
                socketRef.current.emit(ACTIONS.HTML_CODE_CHANGE, {
                    roomId: roomId,
                    code: code
                })
            }
        })




    }


    return (
        <div className='editor-div p-25'>
            <div className='editor-label'>
                HTML
            </div>
            <textarea id="HTMLrealtimeEditor"> </textarea>
        </div>
    )
}

export default HTMLEditor
