import React from 'react'
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    return (
        <div className='client'>

            <Avatar
                name={username}
                size={50}
                round="14px"
                color="#fa0ca7"
            />

            <span className='userName'>{username?.split(" ")[0]}</span>

        </div>
    )
}

export default Client
