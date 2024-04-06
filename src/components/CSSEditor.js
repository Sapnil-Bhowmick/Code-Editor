import React from 'react'

import Codemirror from 'codemirror'

import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/css/css.js'

// import 'codemirror/theme/dracula.css'

import 'codemirror/addon/edit/closetag'

import 'codemirror/addon/edit/closebrackets'
import ACTIONS from '../Actions/Actions'
import { DataContext } from '../context/codecontext'





const CSSEditor = ({ socketRef, roomId, onCodeChange}) => {


    const { setCSS , theme} = React.useContext(DataContext)
    const CSSeditorRef = React.useRef(null)



    React.useEffect(() => {
        Initialize()
        persistCode()
    }, [])



    React.useEffect(() => {

        if (socketRef.current) {
            // console.log('Received')
            socketRef.current.on(ACTIONS.CSS_CODE_CHANGE, ({ code }) => {
                // console.log('Received', code)
                if (code !== null) {
                    CSSeditorRef.current.setValue(code);
                    localStorage.setItem("CSS", code)
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CSS_CODE_CHANGE);
        };
    }, [socketRef.current]);



    const persistCode = () => {
        if(localStorage.getItem("CSS")){
            CSSeditorRef.current.setValue(localStorage.getItem("CSS"));
        }
       
    }


    const Initialize = async () => {
        CSSeditorRef.current = Codemirror.fromTextArea(document.getElementById('CSSrealtimeEditor'), {
            mode: { name: 'css' },
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
        CSSeditorRef.current.on('change', (instance, changes) => {
            // console.log('changes' , changes)
            // * origin gives the type of action performed in changes object
            const { origin } = changes

            //  * Get the content of the current editor document.
            const code = instance.getValue()
            localStorage.setItem("CSS", code)
            onCodeChange(code)
            setCSS(code)


            if (origin !== "setValue") {
                socketRef.current.emit(ACTIONS.CSS_CODE_CHANGE, {
                    roomId: roomId,
                    code: code
                })
            }
        })




    }


    return (
        <div className='editor-div p-25'>
            <div className='editor-label'>
                CSS
            </div>
            <textarea id="CSSrealtimeEditor"> </textarea>
        </div>
    )
}

export default CSSEditor
