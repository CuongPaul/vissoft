export const WELCOME = 'Welcome';
export const SUBSCRIBE = 'Subscribe';
export const UNSUBSCRIBE = 'Unsubscribe';

import Welcome from './Welcome';
import Subscribe from './Subscribe';
import Unsubscribe from './Unsubscribe';

const getTemplate = (name, props) => {
    const templates = {
        [WELCOME]: <Welcome {...props}/>,
        [SUBSCRIBE]: <Subscribe {...props}/>,
        [UNSUBSCRIBE]: <Unsubscribe {...props}/>
    };

    return templates[name];
}

export {getTemplate};