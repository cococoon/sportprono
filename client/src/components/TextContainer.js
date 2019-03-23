import React from 'react';

const TextContainer = (props) => {
    let title = props.title;
    let content = props.text;
    return (
        <div className='container wow fadeInLeft'>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

export default TextContainer;