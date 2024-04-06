import React from 'react'
import Client from '../../components/Client'

import { initSocket } from '../../socket'

import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import LOGO from '../../Images/code-sync.png'
import HTMLEditor from '../../components/HTMLEditor'
import CSSEditor from '../../components/CSSEditor'
import JSEditor from '../../components/JSEditor'
import Results from '../../components/Results'
import ACTIONS from '../../Actions/Actions'







const EditorPage = () => {

  React.useEffect(() => {
    Initialize()

    //  * off : Unbind the specified event handler (opposite of .on()). That is Unsubscribing
    //  * Always remove the event handlers on component unmount to prevent memory overload issues
    //  * Her we are Unsubscribing from socket events
    return () => {
      socketRef.current.disconnect()
      socketRef.current.off(ACTIONS.JOINED)
      socketRef.current.off(ACTIONS.DISCONNECTED)
    }
  }, [])



  const socketRef = React.useRef(null)
  const HTML_codeRef = React.useState(null)
  const CSS_codeRef = React.useState(null)
  const JS_codeRef = React.useState(null)

  const location = useLocation()
  const roomId = location.pathname.split("/")[2]

  const reactNavigator = useNavigate()

  const [clients, setClients] = React.useState([])








  const Initialize = async () => {
    socketRef.current = await initSocket()

    socketRef.current.on('connect_error', (error) => handleError(error))
    socketRef.current.on('connect_failed', (error) => handleError(error))

    //  * Emitting event(named ACTIONS.JOIN) from socket client to server 
    socketRef.current.emit(ACTIONS.JOIN, {
      roomId: roomId,
      username: location.state?.username
    })


    // & Listening for joined Event
    socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {

      // * Showing message to all users except the user who has joined
      if (username !== location.state?.username) {
        toast.success(`${username} has joined`)
      }

    
      setClients(clients)


      // * Emitting events for auto-syncing with the existing code on initial join 

      socketRef.current.emit('HTML_SYNC_CODE', {
        code: HTML_codeRef.current,
        socketId: socketId
      })

      socketRef.current.emit('CSS_SYNC_CODE', {
        code: CSS_codeRef.current,
        socketId: socketId
      })

      socketRef.current.emit('JS_SYNC_CODE', {
        code: JS_codeRef.current,
        socketId: socketId
      })


    })




    // & Listening for disconnected event
    socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
      toast.success(`${username} left the room`)

      // * Clearing localstorage data on leaving the room ie on disconnecting
      localStorage.removeItem('HTML')
      localStorage.removeItem('CSS')
      localStorage.removeItem('JS')

      setClients((prev) => {
        const updatedClientList = prev.filter((client) => client.socketId !== socketId)
        return updatedClientList
      })
    })


  }


  const handleError = (e) => {
    toast.error("Socket connection failed , try again later.")
    reactNavigator('/')
  }



  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId)
      toast.success('RoomId has been copied')
    }
    catch (error) {
      toast.error('Could not copy RoomId')
    }
  }


  const leaveRoom = () => {
    reactNavigator("/")
  }



  //  & -------------    useNavigate vs navigate  +  Protected Routes using Navigate component (IMP)  -------------------------  


  //  * https://dev.to/cjreads665/usenavigatenavigate-and-uselocation-in-react-router-v6-lip








  if (!location.state) {
    return <Navigate to="/" />
  }


  return (
    <div className='mainWrap'>

      <div className='aside'>

        <div className='asideInner'>

          <div className='logo'>
            <img
              className="logoImage"
              src={LOGO}
              alt='Application Logo'
            />
          </div>

          <h3 className='connected'> Connected Users</h3>

          <div className='clientList'>
            {
              clients && clients.length !== 0 && clients.map((client) => (
                <Client username={client.username} key={client.socketId} />
              ))
            }
          </div>

          <div className='joined-user'>
             You Joined as <span className='name'> {location.state?.username} </span>
          </div>

        </div>

        <button className='btn copyBtn' onClick={copyRoomId}> COPY ROOM ID </button>
        <button className='btn leaveBtn' onClick={leaveRoom}> Leave </button>

      </div>

      <div className='editorWrap'>

        <HTMLEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => { HTML_codeRef.current = code }}

        // HTMLeditorRef={HTMLeditorRef}
        />

        <CSSEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => { CSS_codeRef.current = code }}
        // CSSeditorRef={CSSeditorRef}
        />

        <JSEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => { JS_codeRef.current = code }}
        />
      </div>

      <div className='Result-main'>
        <div className='output-title'>
          OUTPUT
        </div>
        <div className='result'>
          <Results />
        </div>
      </div>



    </div>
  )
}

export default EditorPage
