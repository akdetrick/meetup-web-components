import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';
import ConditionalWrap from '../utils/components/ConditionalWrap';

export const GRID_AUTOHEIGHT_CLASS = 'gridList--autoHeight';

/**
 * @module GridListComponent
 */
export class GridListComponent extends React.Component {
	render() {
		const {
			className,
			columns,
			items,
			autoHeight,
			autoHeightWithWrap,
			itemClassNames,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx(
			'gridList',
			{
				[`gridList--has${columns.default}`]: !!columns.default,
				[`atMedium_gridList--has${columns.medium}`]: !!columns.medium,
				[`atLarge_gridList--has${columns.large}`]: !!columns.large,
			},
			className
		);

		const autoHeightClassNames = cx(
			'flex gridList',
			GRID_AUTOHEIGHT_CLASS,
			{
				'flex--wrap': autoHeightWithWrap,
				[`${GRID_AUTOHEIGHT_CLASS}--has${columns.default}`]: !!columns.default,
				[`atMedium_${GRID_AUTOHEIGHT_CLASS}--has${
					columns.medium
				}`]: !!columns.medium,
				[`atLarge_${GRID_AUTOHEIGHT_CLASS}--has${
					columns.large
				}`]: !!columns.large,
			},
			className
		);

		const listItemClassNames = cx('gridList-item', {
			['flex-item']: autoHeight,
			[itemClassNames]: itemClassNames,
		});

		return (
			<ConditionalWrap
				condition={this.props.children && isLoading}
				wrap={children => (
					<div className="component--isLoading">
						{[children, this.props.children]}
					</div>
				)}
			>
				<ul
					className={
						autoHeight || autoHeightWithWrap
							? autoHeightClassNames
							: classNames
					}
					{...other}
				>
					{items.map((item, key) => (
						<li key={key} className={listItemClassNames}>
							<div className="gridList-itemInner">{item}</div>
						</li>
					))}
				</ul>
			</ConditionalWrap>
		);
	}
}

GridListComponent.propTypes = {
	/** Whether the height of the items in the GridList should fill the available height */
	autoHeight: PropTypes.bool,

	/** Whether autoheight GridList items should wrap lines */
	autoHeightWithWrap: PropTypes.bool,

	/** Columns in the grid at each breakpoint */
	columns: PropTypes.shape({
		default: PropTypes.number.isRequired,
		medium: PropTypes.number,
		large: PropTypes.number,
	}),

	/** Items to render into a grid */
	items: PropTypes.arrayOf(PropTypes.element).isRequired,

	/** Class names to add to each item's wrapper */
	itemClassNames: PropTypes.string,

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

const GridList = withLoading(GridListComponent);
GridList.displayName = 'GridList';
export default GridList;
