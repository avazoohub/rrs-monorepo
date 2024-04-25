"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import { getAuctionAction, updateAuction } from "@/utils/queries/auction";
import { getTotalPointsAction, updateUserPoints } from "@/utils/queries/user";

export async function addBid(
  prevState: {
    response: {
      data: any;
      message: string;
      type: string;
      points: any;
    };
  },
  formData: FormData,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userId = formData.get("userId") as string;
  const auctionId = formData.get("auctionId") as string;
  const amount = parseInt(formData.get("amount") as string);

  // ----------------------------------------
  // Get user total points and product data
  // ----------------------------------------
  const { data } = await getTotalPointsAction(userId);
  const totalPoints = data ? data[0]?.auction : 0;

  if (amount > 0) {
    const { data: product } = await getAuctionAction(auctionId);

    // ------------------------------------
    // Check if there's still time to bid
    // ------------------------------------
    if (product) {
      const now = new Date().getTime();
      const end = new Date(product.endTime).getTime();
      const timeLeft = end - now;
      if (timeLeft < 0) {
        return {
          response: {
            data: null,
            message: "Bid is already closed.",
            type: "error",
            points: totalPoints,
          },
        };
      }

      if (totalPoints > 0) {
        // ------------------------------------------------------
        // Calculate bid amount and determine highest bid amount
        // ------------------------------------------------------
        if (amount < product.startingBid || amount <= product.currentBid) {
          return {
            response: {
              data: null,
              message:
                "Your bid should be higher than the starting/current bid.",
              type: "error",
              points: totalPoints,
            },
          };
        } else if (amount > totalPoints) {
          return {
            response: {
              data: null,
              message: "Your do not have enough points.",
              type: "error",
              points: totalPoints,
            },
          };
        } else {
          // -----------------------
          // Record bid of this user
          // -----------------------
          await supabase.from("bids").insert({
            userId,
            auctionId,
            amount,
          });

          // ----------------------------------------------
          // Update user total points from total bid amount
          // ----------------------------------------------
          const total = totalPoints - amount;
          updateUserPoints(userId, total);
          updateAuction(product.id, userId, amount);

          revalidatePath("/");

          return {
            response: {
              data: { product: product, amount: amount, auctionId: auctionId },
              message: "Bid successful.",
              type: "success",
              points: total,
            },
          };
        }
      }
    }
  }
  return {
    response: {
      data: null,
      message: "Not enough points.",
      type: "error",
      points: totalPoints,
    },
  };
}
