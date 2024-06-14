import { createPost } from '@/actions/actions';
import DeleteBtn from '@/components/DeleteBtn';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function PostsPage() {
	// const posts = await prisma.post.findMany();
	const user = await prisma.user.findUnique({
		where: {
			email: 'johndoe@gmail.com'
		},
		include: {
			posts: true
		}
	});

	return (
		<main className='flex flex-col items-center gap-y-5 pt-24 text-center bg-slate-300'>
			<h1 className='text-3xl font-semibold'>
				All Posts ({user?.posts.length})
			</h1>

			<ul className='border-t border-b border-black/10 py-5 leading-8'>
				{user?.posts.map((post) => {
					return (
						<li
							key={post.id}
							className='flex items-center justify-between px-5'
						>
							<Link href={`/posts/${post.slug}`}>{post.title}</Link>
							<DeleteBtn postId={post.id} />
						</li>
					);
				})}
			</ul>

			<form action={createPost} className='flex flex-col gap-y-2 w-[300px]'>
				<input
					type='text'
					name='title'
					placeholder='Title'
					className='px-2 py-1 rounded-sm'
				/>
				<textarea
					name='content'
					rows={5}
					placeholder='Content'
					className='px-2 py-1 rounded-sm'
				/>
				<button
					type='submit'
					className='bg-blue-500 py-2 text-white rounded-sm'
				>
					Create Post
				</button>
			</form>
		</main>
	);
}

// PRISMA DB GUIDE
// const posts = await prisma.post.findMany({
// if only i want specific title
// 	where: {
// 		title: {
// 			endsWith: 'Posting'
// 		}
// 	},
// 	orderBy: {
// 		createAt: 'desc'
// 	},
// specific requirement only
// 	select: {
// 		id: true,
// 		title: true,
// 		slug: true
// 	},
// if i want pagination
// skip: 10,
// take: 10,
// });

// const postsCount = await prisma.post.count();
