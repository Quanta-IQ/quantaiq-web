import React from 'react';

export default function TemporaryPDF(
    {docURL} : {docURL: any}

){
    return (
        <iframe
            //src="https://ds-usafa.github.io/Computational-Probability-and-Statistics/"
            src={docURL}
            style={{
                width: '100%', 
                height: '100%', 
                border: 'none', 
                // transform: 'scale(1)',
                transformOrigin: '0 0', 
                float: 'right', 
            }}
            frameBorder="0"
            allowFullScreen
        ></iframe>
    );
};
