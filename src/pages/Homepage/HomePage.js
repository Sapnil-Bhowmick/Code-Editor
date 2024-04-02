
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import LOGO from '../../Images/code-sync.png'

const HomePage = () => {

  const navigate = useNavigate()
  const [roomId, setRoomId] = React.useState('')
  const [username , setUsername] = React.useState('')

  const createRoom = (e) => {
    e.preventDefault()
    const id = uuidv4()
    setRoomId(id)
    toast.success("Created a new room")
  }


  const joinRoom = () => {
    if (!roomId){
      toast.error("RoomId is required")
      return
    }
    else if(!username){
      toast.error("Username is required")
      return
    }

     navigate(`/editor/${roomId}` , {
      state: {
        username
      }
     })
  }

  const handleEnterPress = (e) => {
    if(e.code === "Enter"){
      joinRoom()
    }
  }


  return (
    <div className='homepageWrapper'>
      <div className='formwrapper'>

        <img src={LOGO} alt="Application Logo" className='homePage-logo' />

        <h4 className='mainLabel'> Paste Invitation ROOM ID </h4>

        <div className='inputGroups'>
          <input
            type='text'
            className='inputBox'
            placeholder='ROOM ID'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyDown={handleEnterPress}
          />

          <input
            type='text'
            className='inputBox'
            placeholder='USERNAME'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleEnterPress}
          />

          <button onClick={joinRoom} className='btn joinBtn'> Join </button>

          <span className='createInfo'>

            If you don't hanve an invite then create &nbsp;

            <a onClick={createRoom} href="" className='createNewBtn'> new room  </a>

          </span>
        </div>

      </div>

      <footer>
        <h4>
          Build with ❤ from Sapnil
          <a href="" > Github Id </a>
        </h4>
      </footer>

    </div>
  )
}

export default HomePage
