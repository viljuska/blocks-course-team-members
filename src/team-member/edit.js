import { useBlockProps, RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { isBlobURL }                                 from '@wordpress/blob';
import { Spinner, withNotices }                      from '@wordpress/components';
import { __ }                                        from '@wordpress/i18n';

function edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
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
		},
		onSelectUrl = newUrl => {
			setAttributes( {
				url: newUrl,
				id: undefined,
				alt: ''
			} );
		},
		onUploadError = message => {
			noticeOperations.removeAllNotices();
			noticeOperations.createErrorNotice( message );
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
			</div>
		}
		<MediaPlaceholder
			icon="admin-users"
			onSelect={ onSelectImage }
			onSelectUrl={ onSelectUrl }
			onError={ onUploadError }
			notices={ noticeUI }
			accept="image/*"
			allowdTypes={ [ 'image' ] }
			disableMediaButtons={ url }
		/>
	</div>;
}

export default withNotices( edit );
