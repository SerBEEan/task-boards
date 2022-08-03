import { forwardRef } from 'react';
import classNames from 'classnames';
import { getEnum } from '../../utils/getEnum';

import styles from './styles.module.css';

const SIZE_MAP = {
    'xs': styles.sizeXs,
    's': styles.sizeS,
    'm': styles.sizeM,
    'l': styles.sizeL,
};

const TYPE_MAP = {
    'default': styles.typeDefault,
    'primary': styles.typePrimary,
    'text': styles.typeText,
    'outlined': styles.typeOutlined,
};

const SHAPE_MAP = {
    'default': styles.shapeDefault,
    'circle': styles.shapeCircle,
};

const COLOR_MAP = {
    'default': styles.colorDefault,
    'disabled': styles.colorDisabled,
};

export const Size = getEnum(Object.keys(SIZE_MAP));
export const Type = getEnum(Object.keys(TYPE_MAP));
export const Shape = getEnum(Object.keys(SHAPE_MAP));
export const Color = getEnum(Object.keys(COLOR_MAP));


function Button(props, ref) {
    const {
        children,
        size = Size.m,
        type = Type.default,
        icon,
        gutter = '0.5em',
        shape = Shape.default,
        block = false,
        color = Color.default,
        onClick,
        className,
    } = props;

    return (
        <button
            className={classNames(
                styles.button,
                SIZE_MAP[size],
                TYPE_MAP[type],
                SHAPE_MAP[shape],
                COLOR_MAP[color],
                {[styles.fullWitch]: block},
                className
            )}
            ref={ref}
            style={{ gap: gutter }}
            onClick={onClick}
        >
            {icon && (
                <span className={styles.iconContainer}>
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
}

export default forwardRef(Button);
