import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';
import Icon from './Icon';

export const AVATAR_PERSON_CLASS = 'avatar--person';
export const AVATAR_PERSON_ORG_CLASS = 'avatar--org';
export const AVATAR_PERSON_FB_CLASS = 'avatar--fbFriend';
export const AVATAR_PERSON_NOPHOTO_CLASS = 'avatar--noPhoto';

/**
 * An avatar for a member - just supply a member
 * @module AvatarMember
 */
class AvatarMember extends React.PureComponent {
	render() {
		const {
			member,
			org,
			fbFriend,
			className,
			...other
		} = this.props;

		const showNoPhoto = (member.photo || {}).photo_link == undefined;
		const classNames = cx(
			AVATAR_PERSON_CLASS,
			{
				[AVATAR_PERSON_ORG_CLASS]: org,
				[AVATAR_PERSON_FB_CLASS]: fbFriend,
				[AVATAR_PERSON_NOPHOTO_CLASS]: showNoPhoto
			},
			className);

		return (
			<Avatar
				alt={member.name}
				src={(member.photo || {}).photo_link || ''}
				className={classNames}
				{...other}
			>
				{showNoPhoto &&
					[
						<Icon shape='profile' size='l' key='0' />,

						// creates SVG circles for icon clipping paths
						<svg key='1'>
							<clipPath id='clippingXl'>
								<circle cx='60' cy='50' r='60' fill='black'/>
							</clipPath>
							<clipPath id='clippingLg'>
								<circle cx='24' cy='19' r='24' fill='black'/>
							</clipPath>
							<clipPath id='clippingMed'>
								<circle cx='18' cy='9' r='22' fill='black'/>
							</clipPath>
						</svg>
					]
				}
			</Avatar>
		);
	}
}

AvatarMember.propTypes = {
	member: React.PropTypes.object.isRequired,
	org: React.PropTypes.bool,
	fbFriend: React.PropTypes.bool,
};

export default AvatarMember;

