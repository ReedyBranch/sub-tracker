import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js"; // uses your existing workflowClient instance

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
      status: "active",
    });

    let workflowRunId = null;

    try {
      const result = await workflowClient.publish({
        url: "http://localhost:5500/api/v1/workflows/subscription/reminder",
        body: {
          subscriptionId: subscription._id.toString(),
          userEmail: req.user.email,
        },
      });

      workflowRunId = result.workflowId || null;
      console.log("✅ QStash workflow published successfully:", result);
    } catch (error) {
      console.error("⚠️ QStash publish failed:", error.message);
    }

    res.status(201).json({
      success: true,
      data: {
        subscription,
        workflowRunId,
      },
    });
  } catch (e) {
    console.error("❌ Subscription creation error:", e);
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const subscriptions = await Subscription.find({ user: userId });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
