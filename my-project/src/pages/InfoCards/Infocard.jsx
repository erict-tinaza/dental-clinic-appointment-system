import React from 'react';

const Infocard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className={`card lg:card-side shadow-xl ${bgClass} p-6 text-white `}>
        <div className="w-14 flex">
            <img  src={icon} alt="Icon" />
        </div>
        <div className="card-body text-left">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
        </div>
    </div>
    );
};

export default Infocard;