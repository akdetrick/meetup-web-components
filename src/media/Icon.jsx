import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES } from '../utils/designConstants';
import { VALID_SHAPES } from 'swarm-icons/dist/js/shapeConstants';

export const ICON_CLASS = 'svg';
export const SVG_THIN_STYLE = '--small';

/**
 * @param {String} shape - icon shape
 * @param {String} size - icon size
 * @returns {String} icon name (with or without suffix)
 */
export const getIconShape = (shape, size) => {
	// third party icons (yahoo, facebook, etc) do not have small variants
	if (shape.includes('external')) {
		return shape;
	}

	const suffix = (size === 'xs' || size === 's') ? SVG_THIN_STYLE : '';
	return `${shape}${suffix}`;
};

/**
 * Icon component used to insert an svg icon into a component or page
 *
 * **Accessibility** If an Icon is used on its own without supporting
 * text to explain what it is/does, be a good citizen and pass in an
 * `aria-label` attribute describing what the icon represents
 *
 * @module Icon
 */
class Icon extends React.PureComponent {
	render() {
		const { className, shape, size, ...other } = this.props;

		const classNames = cx(ICON_CLASS, `svg--${shape}`, className);

		const sizeVal = MEDIA_SIZES[size];

		return (
			<span className={classNames}>
				<svg
					preserveAspectRatio='xMinYMin meet'
					width={sizeVal}
					height={sizeVal}
					viewBox={`0 0 ${sizeVal} ${sizeVal}`}
					className='svg-icon valign--middle'
					role='img'
					{...other}
				>
					<use xlinkHref={`#icon-${getIconShape(shape, size)}`} />
				</svg>
			</span>
		);
	}
}

Icon.defaultProps = {
	size: 's',
};

Icon.propTypes = {
	shape: PropTypes.oneOf(VALID_SHAPES).isRequired,
	size: PropTypes.oneOf(Object.keys(MEDIA_SIZES)).isRequired,
};

export default Icon;
