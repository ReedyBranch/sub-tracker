import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// ✅ Get all subscriptions for a user
subscriptionRouter.get("/", authorize, getUserSubscriptions);

// ✅ Get subscriptions for specific user by ID (if needed)
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

// ✅ Create a new subscription
subscriptionRouter.post("/", authorize, createSubscription);

// ✅ Update a subscription
subscriptionRouter.put("/:id", authorize, updateSubscription);

// ✅ Cancel a subscription (if supported)
subscriptionRouter.put("/:id/cancel", authorize, (req, res) =>
  res.send({ title: "CANCEL subscription" })
);

// ✅ Delete a subscription
subscriptionRouter.delete("/:id", authorize, deleteSubscription);

// ✅ Upcoming renewals (placeholder or implement later)
subscriptionRouter.get("/upcoming-renewals", authorize, (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
