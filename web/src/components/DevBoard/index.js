import React from 'react'
import './styles.css'

function DevBoard({devInfo}) {
    let techs = devInfo.techs.map(tech=>tech[0].toUpperCase() + tech.slice(1)).join(', ')

    //techs = techs[0].toUpperCase() + techs.slice(1);
    return (
        <li className="devBoard">
            <header>
                <img alt={devInfo.name} src={devInfo.avatar_url} />
                <div className="userInfo">
                    <strong>{devInfo.name}</strong>
                    <span>{techs}</span>
                </div>
            </header>
            <p>{devInfo.bio}</p>
            <a 
            href={`https://github.com/${devInfo.github_username}`} 
            rel="noopener noreferrer"
            target="_blank" 
            >Acessar
            </a>
        </li>
    )
}

export default DevBoard