import HtmlElement from '../HtmlElement';
import styles from './Heading.module.scss';
import clsx from 'clsx';

const Heading = ({
        type = 'h1',
        elementProps = {},
        children = ''
    }) => {
    const {className: customClass = ''} = elementProps;
    const className = clsx(styles.heading, styles[type], customClass);

    return (
        <HtmlElement type={type} props={{...elementProps, className}}>
            {children}
        </HtmlElement>
    );
};

export default Heading;
