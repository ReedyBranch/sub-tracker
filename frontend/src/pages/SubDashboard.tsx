import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SubForm from "../components/SubForm";
import SubList from "../components/SubList";
import {
  createSubscription,
  fetchUserSubscriptions,
} from "../api/subscription.api";
import { getToken } from "../api/auth.api";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
}

interface SubscriptionFormData {
  name: string;
  price: number;
  startDate: string;
  category: string;
  paymentMethod: string;
}

function SubDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // ✅ Fetch subscriptions on page load
  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions();
        const formatted = data.map(
          (sub: {
            _id: string;
            name: string;
            price: number;
            startDate: string;
          }) => ({
            id: sub._id,
            name: sub.name,
            amount: sub.price,
            nextRenewal: sub.startDate,
          })
        );
        setSubscriptions(formatted);
      } catch (error) {
        console.error("Error loading subscriptions:", error);
      }
    };

    loadSubscriptions();
  }, []);

  const handleAddSubscription = async (sub: SubscriptionFormData) => {
    const token = getToken();

    const subscriptionData = {
      name: sub.name,
      price: sub.price,
      startDate: sub.startDate,
      category: sub.category,
      paymentMethod: sub.paymentMethod,
      frequency: "monthly", // or get this value from the form if available
    };

    try {
      const subscription = await createSubscription(subscriptionData, token);

      const newSub: Subscription = {
        id: subscription._id,
        name: subscription.name,
        amount: subscription.price,
        nextRenewal: subscription.startDate,
      };

      setSubscriptions((prev) => [...prev, newSub]);
    } catch (err) {
      console.error("Failed to create subscription:", err);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <DashboardLayout>
      <h1>My Subscriptions</h1>
      <SubForm onSubmit={handleAddSubscription} />
      <SubList subscriptions={subscriptions} />
    </DashboardLayout>
  );
}

export default SubDashboard;
