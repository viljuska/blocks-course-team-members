import { useEffect, useState }                                                        from '@wordpress/element';
import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL }                                                   from '@wordpress/blob';
import { Spinner, withNotices }                                                       from '@wordpress/components';
import { __ }                                                                         from '@wordpress/i18n';

function edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
	const { name, bio, url, alt, id } = attributes,
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
		},
		[ blobURL, setBlobURL ] = useState();

	// If user uploads image and quickly save and reloads page and the image is not uploaded,
	// there is still a blob left, and if it's a blob we won't have our image.
	// This runs only at page load, so if we have a blob it will be removed, and we can re-upload new image
	useEffect( () => {
		if ( !id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				id: undefined,
				alt: ''
			} );
		}
	}, [] );

	// Free up memory by clearing blobURL after successful upload
	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL();
		}
	}, [ url ] );

	return <>
		<BlockControls group="inline">
			<MediaReplaceFlow
				name={ __( 'Replace Image', 'team-members' ) }
				onSelect={ onSelectImage }
				onSelectURL={ onSelectUrl }
				onError={ onUploadError }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				mediaId={ id }
				mediaURL={ url }
			/>
		</BlockControls>
		<div { ...useBlockProps() }>
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
		</div>
	</>;
}

export default withNotices( edit );
