import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt';
import { getPrisma } from '../access';
import { CreatePost, UpdatePost } from '@imran.techvoyager/common-package';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
      }
      Variables: {
        userId: string
      }
}>();

//creating a middleware for authentication
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string };;
    if(user){
        c.set("userId", user.id);
        await next();
    }else{
       c.status(403)
       return c.json({
          message: "you are not logged in"
       })
    }
    } catch (error) {
         c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    
})

blogRouter.post('/', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get("userId")
    const body = await c.req.json();
    const { success } = CreatePost.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            message: "invalid data"
        })
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId)
        }
    })
    return c.json({
        id: post.id
    });
})

blogRouter.put('/', async(c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = UpdatePost.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            message: "invalid data"
        })
    }
    await prisma.post.update({
        where: {
			id: body.id
		},
		data: {
			title: body.title,
			content: body.content
		}
    })
    return c.text('post updated');
})

//need to do pagination so that only 10 blogs are shown and rest are shown on demand i.e, on scrolling
blogRouter.get('/bulk', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    });
})

blogRouter.get('/:id', async(c) => {
    const id = c.req.param('id');
    const prisma = getPrisma(c.env.DATABASE_URL);
    const post = await prisma.post.findUnique({
        where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
    })
    return c.json(post);
})
