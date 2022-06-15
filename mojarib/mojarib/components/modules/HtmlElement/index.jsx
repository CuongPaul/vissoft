import {createElement} from 'react';

const HtmlElement = ({
        type = '',
        props = {},
        children = ''
    }) => {
    return (
        <>
            {createElement(type, props, children)}
        </>
    );
};

export default HtmlElement;
