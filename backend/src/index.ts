import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt';
import { getPrisma } from './access';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.post('/api/v1/user/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const body = await c.req.json();
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
    return c.json({
      message: "signed up successfully",
      token: jwt
    })
  }catch(e){
    console.log("error signing up", e)
    return c.text('invalid')
  }
})

export default app
