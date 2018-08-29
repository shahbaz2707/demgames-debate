import React from 'react'
import './Card.css'

export const ModuleCard = ({href, module, colour, title}) => (
    <a href={href} className={`card module-card`}>
        <div className="text-center module-card-title"><b>{title}</b></div>
        <div className={`module-glass glass-${colour}`}></div>
        <div className={`module-bg ${module}`}></div>
    </a>
)