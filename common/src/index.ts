import z from 'zod';

 export const SignUp=z.object({
    email:z.string().email(),
    name:z.string().optional(),
    password:z.string().min(6).max(11)
})
export type SignUpType=z.infer<typeof SignUp >

export const SignIn=z.object({
    email:z.string().email(),
    password:z.string().min(6).max(12)
})

export type SignInType=z.infer<typeof SignIn>

export const CreatePost=z.object({
    title:z.string(),
    content:z.string(),
    published:z.boolean().optional()
})
export type CreatePostType=z.infer<typeof CreatePost>

export const UpdatePost=z.object({
    title:z.string().optional(),
    content:z.string().optional(),
    published:z.boolean().optional()
})
export type UpdatePostType=z.infer<typeof UpdatePost>