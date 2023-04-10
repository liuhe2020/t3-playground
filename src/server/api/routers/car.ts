import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const carRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany();
  }),

  create: publicProcedure
    .input(
      z.array(z.object({ make: z.string(), model: z.string(), hp: z.number() }))
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.car.createMany({
        data: input,
        skipDuplicates: true,
      });
    }),
});
