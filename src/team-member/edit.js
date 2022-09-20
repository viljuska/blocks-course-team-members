import { useBlockProps, RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { __ }                                        from '@wordpress/i18n';

export default function edit( { attributes, setAttributes } ) {
	const { name, bio } = attributes,
		onChangeName = newName => setAttributes( { name: newName } ),
		onChangeBio = newBio => setAttributes( { bio: newBio } );

	return <div { ...useBlockProps() }>
		<RichText
			placeholder={ __( 'Member Name', 'team-member' ) }
			tagName="h4"
			onChange={ onChangeName }
			value={ name }
			allowedFormats={ [] }
		/>
		<RichText
			placeholder={ __( 'Member Bio', 'team-member' ) }
			tagName="p"
			onChange={ onChangeBio }
			value={ bio }
			allowedFormats={ [] }
		/>
		<MediaPlaceholder
			icon="admin-users"
			onSelect={ val => console.log( val ) }
			onSelectUrl={ val => console.log( val ) }
			onError={ err => console.error( err ) }
			accept="image/*"
			allowdTypes={ [ 'image' ] }
		/>
	</div>;
}
