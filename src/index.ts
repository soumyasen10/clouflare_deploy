import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono()

app.get('/', async (c) => {
  // Todo add zod validation here
//   const body: {
//     name: string;
//     email: string
//   } = await c.req.json()
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  const res=await prisma.user.create({
    data: {
      name: "soumya",
      email: "soumyasen@gmail.com"
    }
  })
  
  return c.json(res)
})

export default app