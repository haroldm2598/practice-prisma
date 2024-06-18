'use client';
import { FormEvent, useState } from 'react';
import { editPost } from '@/actions/actions';
import { revalidatePath } from 'next/cache';
import { EditPostFormProps } from '@/lib/definition';

const EditPostForm: React.FC<EditPostFormProps> = ({
	postId,
	initialTitle,
	initialContent
}) => {
	const [title, setTitle] = useState(initialTitle);
	const [content, setContent] = useState(initialContent);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);

		try {
			await editPost(formData, postId);
			revalidatePath('/posts');
			console.log('Post updated successfully!');
			// Optionally, you can redirect or show a success message
		} catch (error) {
			console.error('Error updating post:', error);
			// Handle error state or show an error message
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-y-2 w-[300px]'>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
				className='px-2 py-1 rounded-sm'
			/>

			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
				className='px-2 py-1 rounded-sm'
			/>

			<button type='submit' className='bg-blue-500 py-2 text-white rounded-sm'>
				Update Post
			</button>
		</form>
	);
};

export default EditPostForm;
