import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const initialPost: Prisma.PostCreateInput[] = [
	{
		title: 'Post 1',
		slug: 'post-1',
		content: 'Content of Post 1',
		author: {
			connectOrCreate: {
				where: {
					email: 'johndoe@gmail.com'
				},
				create: {
					email: 'johndoe@gmail.com',
					hashedPassword: 'password'
				}
			}
		}
	}
];

async function main() {
	console.log('Start Seeding....');

	for (const post of initialPost) {
		const newPost = await prisma.post.create({
			data: post
		});

		console.log(`Created post with id: ${newPost.id}`);
	}

	console.log('Seeding Finished');
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
