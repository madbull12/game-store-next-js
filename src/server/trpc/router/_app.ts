// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { cartRouter } from "./cartRouter";
import { wishListRouter } from "./wishlist";

export const appRouter = router({
  auth: authRouter,
  cart:cartRouter,
  wishlist:wishListRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
