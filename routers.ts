import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createPreorder, getAllPreorders, getInventoryByBox, updateInventoryReservedSpots, logEmail, getPreordersByEmail, updatePreorderStatus } from "./db";
import { sendPreorderConfirmation, sendAdminNotification } from "./services/emailService";
import { ENV } from "./_core/env";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  preorder: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        box: z.string().min(1),
        quantity: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          // Check inventory availability
          const inv = await getInventoryByBox(input.box);
          if (!inv) {
            throw new Error("Box type not found");
          }

          const quantityNum = parseInt(input.quantity, 10);
          const availableSpots = inv.totalSpots - inv.reservedSpots;
          
          if (availableSpots < quantityNum) {
            throw new Error(`Only ${availableSpots} spots available for this box`);
          }

          // Create preorder
          await createPreorder({
            name: input.name,
            email: input.email,
            box: input.box,
            quantity: input.quantity,
          });

          // Update inventory
          await updateInventoryReservedSpots(input.box, quantityNum);

          // Send confirmation email to customer
          const emailResult = await sendPreorderConfirmation({
            name: input.name,
            email: input.email,
            box: input.box,
            quantity: input.quantity,
          });

          // Log email
          await logEmail({
            preorderId: 1, // This would ideally be the actual preorder ID from the insert
            email: input.email,
            subject: "🎉 Your Squishly Preorder is Confirmed!",
            status: emailResult.success ? "sent" : "failed",
            errorMessage: emailResult.error || null,
          });

          // Send admin notification
          if (ENV.ownerName) {
            await sendAdminNotification(
              {
                name: input.name,
                email: input.email,
                box: input.box,
                quantity: input.quantity,
              },
              "admin@squishly.com" // Replace with actual admin email
            );
          }

          return { 
            success: true,
            message: "Preorder submitted successfully",
          };
        } catch (error) {
          console.error("Failed to submit preorder:", error);
          throw new Error(error instanceof Error ? error.message : "Failed to submit preorder");
        }
      }),
    
    list: publicProcedure.query(async () => {
      return await getAllPreorders();
    }),

    getInventory: publicProcedure.query(async () => {
      const inv = await Promise.all([
        getInventoryByBox("mini"),
        getInventoryByBox("medium"),
        getInventoryByBox("mega"),
      ]);
      return inv.map((item, idx) => ({
        box: ["mini", "medium", "mega"][idx],
        totalSpots: item?.totalSpots || 0,
        reservedSpots: item?.reservedSpots || 0,
        availableSpots: item ? item.totalSpots - item.reservedSpots : 0,
      }));
    }),

    getByEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await getPreordersByEmail(input.email);
      }),

    updateStatus: publicProcedure
      .input(z.object({
        preorderId: z.number(),
        status: z.enum(["pending", "confirmed", "packed", "shipped", "delivered"]),
        trackingNumber: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const success = await updatePreorderStatus(input.preorderId, input.status, input.trackingNumber);
          if (!success) {
            throw new Error("Failed to update preorder status");
          }
          return { success: true, message: "Order status updated" };
        } catch (error) {
          console.error("Failed to update preorder status:", error);
          throw new Error(error instanceof Error ? error.message : "Failed to update status");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
