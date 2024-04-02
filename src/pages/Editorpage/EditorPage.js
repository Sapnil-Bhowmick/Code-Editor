import React from 'react'
import Client from '../../components/Client'
import Editor from '../../components/Editor'



import LOGO from '../../Images/code-sync.png'

const EditorPage = () => {

const [clients , setClients] = React.useState([
  {socketId:1 , username: 'Sapnil B'},
  {socketId:2 , username: 'Palash Bose'},
  {socketId:3 , username: 'John Doe'},
])


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
                  <Client username={client.username} key={client.socketId}/>
                ))
              }
          </div>

        </div>

        <button className='btn copyBtn'> COPY ROOM ID </button>
        <button className='btn leaveBtn'> Leave </button>

      </div>

      <div className='editorWrap'>
            <Editor/>
      </div>

    </div>
  )
}

export default EditorPage
