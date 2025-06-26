import axios from "axios";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
      status: "active",
    });

    // Trigger workflow manually using Axios
    let workflowRunId = null;
    const triggerUrl =
      "http://localhost:5500/api/v1/workflows/subscription/reminder";

    try {
      const result = await axios.post(triggerUrl, {
        subscriptionId: subscription._id,
        userEmail: req.user.email, // optional: include other metadata
      });

      workflowRunId = result.data?.workflowRunId || null;
      console.log("✅ Workflow triggered successfully:", result.data);
    } catch (error) {
      console.error("⚠️ Failed to trigger workflow:", error.message);
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
