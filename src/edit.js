import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl }                       from '@wordpress/components';
import './editor.scss';
import { __ }                                            from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes,
		onChangeColumns = newColumns => setAttributes( { columns: newColumns } );

	return (
		<div
			{ ...useBlockProps( {
				className: `has-${ columns }-columns`
			} ) }
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns', 'team-member' ) }
						min={ 1 }
						max={ 6 }
						onChange={ onChangeColumns }
						value={ columns }
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [ 'blocks-course/team-member' ] }
				orientation="horizontal"
				template={ [
					// With prefilled
					// [ 'blocks-course/team-member', {
					// 	name: 'Member 1', bio: 'Bio 1'
					// } ],
					// Empty
					[ 'blocks-course/team-member' ],
				] }
				// templateLock="insert"
			/>
		</div>
	);
}
