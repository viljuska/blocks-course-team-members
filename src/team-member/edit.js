import { useBlockProps, RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { isBlobURL }                                 from '@wordpress/blob';
import { Spinner }                                   from '@wordpress/components';
import { __ }                                        from '@wordpress/i18n';

export default function edit( { attributes, setAttributes } ) {
	const { name, bio, url, alt } = attributes,
		onChangeName = newName => setAttributes( { name: newName } ),
		onChangeBio = newBio => setAttributes( { bio: newBio } ),
		onSelectImage = image => {
			if ( !image || !image.url ) {
				setAttributes( {
					url: undefined,
					id: undefined,
					alt: ''
				} );

				return;
			}

			setAttributes( {
				url: image.url,
				id: image.id,
				alt: image.alt
			} );
		};

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
		{ url &&
			<div className={ `wp-block-blocks-course-team-member-img ${ isBlobURL( url ) ? 'is-loading' : '' }` }>
				<img src={ url } alt={ alt } />
				{ isBlobURL( url ) && <Spinner /> }
				<Spinner />
			</div>
		}
		<MediaPlaceholder
			icon="admin-users"
			onSelect={ onSelectImage }
			onSelectUrl={ val => console.log( val ) }
			onError={ err => console.error( err ) }
			accept="image/*"
			allowdTypes={ [ 'image' ] }
			disableMediaButtons={ url }
		/>
	</div>;
}
