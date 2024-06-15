import { useRouter } from 'next/router';
import EditPostForm from '@/components/EditPostForm'; // Adjust the import path as per your project structure

const EditPostPage = () => {
	const router = useRouter();
	const { id } = router.query; // Assuming you're passing post ID via query params

	// Fetch post details based on `id` using useEffect or useSWR if needed

	return (
		<div>
			<h1>Edit Post</h1>
			{/* Replace these with actual post data fetched from API */}
			<EditPostForm
				postId={id as string} // Assuming id is string here
				initialTitle='Initial Title'
				initialContent='Initial Content'
			/>
		</div>
	);
};

export default EditPostPage;
