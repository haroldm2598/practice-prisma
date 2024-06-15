import EditPostForm from '@/components/EditPostForm';
import prisma from '@/lib/db';

interface ParamProps {
	params: {
		slug: string;
	};
}
export default async function PostPage({ params }: ParamProps) {
	const post = await prisma.post.findUnique({
		where: {
			slug: params.slug
		}
	});
	return (
		<main className='flex flex-col items-center gap-y-5 pt-24 text-center'>
			<h1 className='text-3xl font-semibold'>{post?.title}</h1>
			<p>{post?.content}</p>
			<EditPostForm
				postId={post?.id as string}
				initialTitle='update title here'
				initialContent='update content here'
			/>
		</main>
	);
}

// using cache but unstable_cache
// import { unstable_cache as cache } from 'next/cache';

// const getCachedPost = cache((slug) => {
// 	return prisma.post.findUnique({
// 		where: {
// 			slug
// 		}
// 	});
// });

// export default async function PostPage({ params }) {
// 	const post = await getCachedPost(params.slug);

// 	return (
// 		<main className='flex flex-col items-center gap-y-5 pt-24 text-center'>
// 			<h1 className='text-3xl font-semibold'>{post?.title}</h1>
// 			<p>{post?.content}</p>
// 		</main>
// 	);
// }
