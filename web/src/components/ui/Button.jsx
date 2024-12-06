import classes from './Button.module.css'
import classNames from 'classnames';

import { Link } from 'react-router-dom';

export default function Button({ href, variant, size, type, onClick, children }) {

    const buttonClass = classNames(
        classes.button,
        classes[`button--${variant}`],
        classes[`button--${size}`]
    );

    if (!type) {
        type = 'button';
    }

    if (href) {
        return <Link to={href} className={`${buttonClass} ${classes.link}`}>
            {children}
        </Link>
    }

    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {children}
        </button>
    )
}