import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

/**
 * Design System Component: Provides `stripe` styled container for components
 * @module ChunkComponent
 */
export class ChunkComponent extends React.Component {
	render() {
		const {
			children,
			className,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx('chunk', { 'component--isLoading': isLoading }, className);

		return (
			<div className={classNames} {...other}>
				{children}
			</div>
		);
	}
}

ChunkComponent.propTypes = {
	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

const Chunk = withLoading(ChunkComponent);
Chunk.displayName = 'Chunk';
export default Chunk;
