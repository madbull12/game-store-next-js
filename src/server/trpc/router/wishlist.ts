import { publicProcedure, router } from "../trpc"
import { z } from "zod"


export const wishListRouter = router({
    addWishlist:publicProcedure
        .input(z.object({ name:z.string(),price:z.number(),image:z.string(),gameId:z.number() }))
        .mutation(({ input,ctx })=>{
            if(!ctx.session) throw new Error("You have to be logged in first")

            const session = ctx.session;
            const userId = session?.user?.id
            
            return ctx.prisma.wishlist.create({
                data:{
                    name:input?.name as string,
                    price:input?.price as number,
                    image:input?.image as string,
                    gameId:input?.gameId as number,
                    user:{
                        connect:{
                            id:userId
                        }
                    }
                }
            });
        }),

    getUserWishlists:publicProcedure
        .query(( { ctx })=>{
            if(!ctx.session) return;

            const session = ctx.session;
            const userId = session?.user?.id
            
            return ctx.prisma.wishlist.findMany({
                where:{
                    userId
                }
            });
        }),

    deleteFromWishlist:publicProcedure
        .input(z.object({ gameId:z.number() }))
        .mutation(({ input,ctx })=>{
            if(!ctx.session) throw new Error("You have to be logged in first")
            const session = ctx.session;
            const userId = session?.user?.id as string
        
            
            return ctx.prisma.wishlist.delete({
                where:{
                    userId_gameId:{
                        gameId:input?.gameId,
                        userId
                    }
                }
            });
        })

})