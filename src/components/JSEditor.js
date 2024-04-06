import React from 'react'

import Codemirror from 'codemirror'

import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript.js'

// import 'codemirror/theme/dracula.css'

import 'codemirror/addon/edit/closetag'

import 'codemirror/addon/edit/closebrackets'
import ACTIONS from '../Actions/Actions'
import { DataContext } from '../context/codecontext'



const JSEditor = ({ socketRef, roomId , onCodeChange}) => {



    const {setJs , theme} = React.useContext(DataContext)
    const JSeditorRef = React.useRef(null)



    React.useEffect(() => {
        Initialize()
        persistCode()
    }, [])



    React.useEffect(() => {

        if (socketRef.current) {
            // console.log('Received')
            socketRef.current.on(ACTIONS.JS_CODE_CHANGE, ({ code }) => {
                // console.log('Received' , code)
                if (code !== null) {
                    JSeditorRef.current.setValue(code);
                    localStorage.setItem("JS", code)
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.JS_CODE_CHANGE);
        };
    }, [socketRef.current]);



    const persistCode = () => {
        if(localStorage.getItem("JS")){
            JSeditorRef.current.setValue(localStorage.getItem("JS"));
        }
    }


  

    const Initialize = async () => {
        JSeditorRef.current = Codemirror.fromTextArea(document.getElementById('JSrealtimeEditor'), {
            mode: { name: 'javascript'},
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
        JSeditorRef.current.on('change', (instance, changes) => {
            // console.log('changes' , changes)
            // * origin gives the type of action performed in changes object
            const { origin } = changes

            //  * Get the content of the current editor document.
            const code = instance.getValue()
            localStorage.setItem("JS", code)
            onCodeChange(code)
            setJs(code)

            if (origin !== "setValue") {
                socketRef.current.emit(ACTIONS.JS_CODE_CHANGE, {
                    roomId: roomId,
                    code: code
                })
            }
        })


    
    
    }


    return (
        <div  className='editor-div p-25'>
            <div className='editor-label'>
                Javascript
            </div>
            <textarea id="JSrealtimeEditor"> </textarea>
        </div>
    )
}

export default JSEditor
