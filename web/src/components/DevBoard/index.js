import React from 'react'
import './styles.css'

function DevBoard({devInfo}) {

    return (
        <li className="devBoard">
            <header>
                <img alt={devInfo?.name} src={devInfo?.avatar_url} />
                <div className="userInfo">
                    <strong>{devInfo?.name}</strong>
                    <span>{devInfo?.techs.toString()}</span>
                </div>
            </header>
            <p>{devInfo?.bio}</p>
            <a 
            href={`https://github.com/${devInfo?.github_username}`} 
            rel="noopener noreferrer"
            target="_blank" 
            >Acessar
            </a>
        </li>
    )
}

export default DevBoard