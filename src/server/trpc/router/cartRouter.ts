import { publicProcedure, router } from "../trpc"
import { z } from "zod"


export const cartRouter = router({
    
    addCart:publicProcedure
        .input(z.object({ name: z.string(), price:z.number(), image:z.string() }).nullish())
        .mutation(({ input,ctx })=>{
            const session = ctx.session;
            const userId = session?.user?.id
            
            return ctx.prisma.cart.create({
                data:{
                    name:input?.name as string,
                    price:input?.price as number,
                    image:input?.image as string,
                    user:{
                        connect:{
                            id:userId
                        }
                    }
                }
            });
    }),
    getCarts:publicProcedure
        .query(({ ctx })=>{
            const session = ctx.session;
            const userId = session?.user?.id

            return ctx.prisma.cart.findMany({
                where:{
                    userId
                }
            });
    }),
    deleteCart:publicProcedure
        .input(z.object({ cartId:z.string() }))
        .mutation(({ input,ctx })=>{
            return ctx.prisma.cart.delete({
                where:{
                    id:input.cartId
                }
            });
        })

    
})