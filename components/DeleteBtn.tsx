'use client';
import React from 'react';
import { deletePost } from '@/actions/actions';

const DeleteBtn = ({ postId }: { postId: string }) => {
	const handleDelete = async () => {
		try {
			await deletePost(postId);
			console.log('Post deleted successfully');
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	return (
		<button
			onClick={handleDelete}
			className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800'
		>
			Delete Post
		</button>
	);
};

export default DeleteBtn;
