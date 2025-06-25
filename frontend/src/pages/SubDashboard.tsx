import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SubForm from "../components/SubForm";
import SubList from "../components/SubList";
import { createSubscription } from "../api/subscription.api";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  // Add other fields as needed
}

function SubDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleAddSubscription = async (sub: Subscription) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in.");
        return;
      }

      // Map Subscription to SubscriptionData
      const subscriptionData = {
        name: sub.name,
        amount: sub.amount,
        nextRenewal: sub.nextRenewal,
        // Provide values for required fields
        price: sub.amount, // or another appropriate value
        startDate: sub.nextRenewal, // or another appropriate value
      };

      const response = (await createSubscription(subscriptionData, token)) as {
        data: { subscription: Subscription };
      };
      setSubscriptions((prev) => [...prev, response.data.subscription]);
    } catch (err) {
      console.error("Failed to create subscription:", err);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <DashboardLayout>
      <h1>My Subscriptions</h1>
      <SubForm
        id=""
        name=""
        amount={0}
        nextRenewal=""
        onSubmit={handleAddSubscription}
      />
      <SubList subscriptions={subscriptions} />
    </DashboardLayout>
  );
}

export default SubDashboard;
