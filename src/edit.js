import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<InnerBlocks
				allowedBlocks={ [ 'blocks-course/team-member' ] }
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
