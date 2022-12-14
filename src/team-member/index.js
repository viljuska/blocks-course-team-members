import { registerBlockType } from '@wordpress/blocks';
import { __ }                from '@wordpress/i18n';
import edit                  from './edit';
import save                  from './save';

registerBlockType( 'blocks-course/team-member', {
	title: __( 'Team Member', 'team-members' ),
	description: __( 'Team Member desc', 'team-members' ),
	icon: 'admin-users',
	parent: [ 'blocks-course/team-members' ],
	supports: {
		reusable: false,
		html: false
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4'
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
		id: {
			type: 'number'
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: ''
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src'
		}
	},
	edit,
	save,
} );
