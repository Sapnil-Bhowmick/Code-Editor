import React from 'react'
import Client from '../../components/Client'
import Editor from '../../components/Editor'
import { initSocket } from '../../socket'
import ACTIONS from '../../Actions/Actions'
import { useLoaderData, useLocation, useNavigate, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import LOGO from '../../Images/code-sync.png'





const EditorPage = () => {

  React.useEffect(() => {
    // console.log('URL' , process.env.REACT_APP_BACKEND_URL)
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





  const codeRef = React.useRef(null)
  const socketRef = React.useRef(null)
  const location = useLocation()
  const roomId = location.pathname.split("/")[2]

  const reactNavigator = useNavigate()

  const [clients, setClients] = React.useState([])

  // console.log('location', roomId)






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

      socketRef.current.emit(ACTIONS.SYNC_CODE , {
        code: codeRef.current,
        socketId: socketId
      })
    })


    // & Listening for disconnected
    socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
      toast.success(`${username} left the room`)

      setClients((prev) => {
        const updatedClientList = prev.filter((client) => client.socketId !== socketId)
        return updatedClientList
      })
    })


  }


  const handleError = (e) => {
    console.log(e)
    toast.error("Socket connection failed , try again later.")
    reactNavigator('/')
  }



  const copyRoomId = async() => {
      try{
        await navigator.clipboard.writeText(roomId)
        toast.success('RoomId has been copied')
      }
      catch(error){
        toast.error('Could not copy RoomId')
      }
  }


  const leaveRoom = () => {
    reactNavigator("/")
  }



  //  & -------------    useNavigate vs navigate  +  Protected Routes using Navigate component (IMP)  -------------------------  


  //  * https://dev.to/cjreads665/usenavigatenavigate-and-uselocation-in-react-router-v6-lip








  if (!location.state) {
    console.log("hello")
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

          <h3> Connected </h3>

          <div className='clientList'>
            {
              clients && clients.length !== 0 && clients.map((client) => (
                <Client username={client.username} key={client.socketId} />
              ))
            }
          </div>

        </div>

        <button className='btn copyBtn' onClick={copyRoomId}> COPY ROOM ID </button>
        <button className='btn leaveBtn'  onClick={leaveRoom}> Leave </button>

      </div>

      <div className='editorWrap'>
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {codeRef.current = code}}
        />
      </div>

    </div>
  )
}

export default EditorPage
