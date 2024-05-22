import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary bg-gradient-to-r from-blue-500 to-teal-400 text-white">{children}</button>
    );
};

export default PrimaryButton;