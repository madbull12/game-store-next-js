import { publicProcedure, router } from "../trpc"
import { z } from "zod"


export const cartRouter = router({
    addCart:publicProcedure
        .input(z.object({ name: z.string(), price:z.number(), image:z.string(), }).nullish())
        .mutation(({ input,ctx })=>{
            
            return ctx.prisma.cart.create({
                data:{
                    name:input?.name,
                    price:input?.price,
                    image:input?.image,
                    user:{
                        
                    }
                }
            });
        })
})