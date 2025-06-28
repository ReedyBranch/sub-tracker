import Subscription from "../models/subscription.model.js";

// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const newSub = new Subscription({ ...req.body, user: userId });
    const savedSub = await newSub.save();

    res.status(201).json({
      title: "CREATE subscription",
      data: savedSub,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all subscriptions for the logged-in user
export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;
    const subscriptions = await Subscription.find({ user: userId });
    res.status(200).json({ data: subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a subscription
export const updateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const updates = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      updates,
      { new: true } // return the updated doc
    );

    if (!updatedSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.status(200).json({ data: updatedSubscription }); // ✅ this must match what your frontend expects
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Failed to update subscription" });
  }
};

// Delete a subscription
export const deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;

    const deleted = await Subscription.findByIdAndDelete(subscriptionId);

    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ message: "Server error" });
  }
};
