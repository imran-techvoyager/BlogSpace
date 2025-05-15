import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt';
import { getPrisma } from '../access';
import { SignUp, SignIn } from '@imran.techvoyager/common-package';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
      }
      Variables: {
        userId: string
      }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const body = await c.req.json();
  const { success } = SignUp.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({
      message: "invalid data"
    })
  }
  try{
  const user = await prisma.user.create({
    data:{
      name: body.name,
      email: body.email,
      password: body.password
    }
   });
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    return c.text(jwt)
  }catch(e){
    console.log("error signing up", e)
    return c.text('invalid')
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const body = await c.req.json();
  const { success } = SignIn.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({
      message: "invalid data"
    })
  }
  try{
  const user = await prisma.user.findFirst({
    where:{
      email: body.email,
      password: body.password
    }
   });
   if(!user){
      c.status(403)
      return c.json({
        message: "invalid credentials"
      })
   }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    return c.text(jwt)
  }catch(e){
    console.log("error signing in", e)
    return c.text('invalid')
  }
})