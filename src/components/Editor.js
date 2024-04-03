import React from 'react'

import Codemirror from 'codemirror'

import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript.js'

import 'codemirror/theme/dracula.css'

import 'codemirror/addon/edit/closetag'

import 'codemirror/addon/edit/closebrackets'
import ACTIONS from '../Actions/Actions'



const Editor = ({ socketRef, roomId , onCodeChange}) => {

    React.useEffect(() => {
        Initialize()
    }, [])


    // React.useEffect(() => {

    //     console.log('Async Code')

    //     if(socketRef.current){
    //         socketRef.current.on(ACTIONS.CODE_CHANGE , ({code}) => {
    //             if(code !== null){
    //                 console.log('CODE' , code)
    //                  // * Set the content of the current editor document.
    //                 editorRef.current.setValue(code)
    //             }
    //         })
    //     }

    //     //  * off : Unbind the specified event handler ie Unsubscribing 
    //     return () => {
    //         socketRef.current.off(ACTIONS.CODE_CHANGE)
    //       }
       

    // } , [socketRef.current])

    React.useEffect(() => {

        // console.log('Setting Code on joining' , socketRef.current)

        if (socketRef.current?.connected) {
            // console.log('Received')
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                console.log('Received' , code)
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);


    const editorRef = React.useRef(null)

    const Initialize = async () => {
        editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
            mode: { name: 'javascript', json: true },
            lineNumbers: true,
            theme: "dracula",
            autoCloseTags: true,
            autocloBrackets: true

        })

        //  * 'change' : event name in codemirror fired for any change in editor
        editorRef.current.on('change', (instance, changes) => {
            // console.log('changes' , changes)
            // * origin gives the type of action performed in changes object
            const { origin } = changes

            //  * Get the content of the current editor document.
            const code = instance.getValue()
            // console.log('changes' , code)

            onCodeChange(code)

            if (origin !== "setValue") {
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId: roomId,
                    code: code
                })
            }
        })


    
    
    }


    return (
        <div>
            <textarea id="realtimeEditor"> </textarea>
        </div>
    )
}

export default Editor
