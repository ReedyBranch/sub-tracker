import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SubForm from "../components/SubForm";
import SubList from "../components/SubList";
import {
  createSubscription,
  fetchUserSubscriptions,
  deleteSubscription as apiDeleteSubscription,
  updateSubscription as apiUpdateSubscription,
} from "../api/subscription.api";
import { getToken } from "../api/auth.api";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  frequency?: string;
  category?: string;
  paymentMethod?: string;
}

interface SubscriptionFormData {
  name: string;
  price: number;
  startDate: string;
  category: string;
  paymentMethod: string;
  frequency: string;
}

function SubDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions();
        interface ApiSubscription {
          _id: string;
          name: string;
          price: number;
          startDate: string;
          frequency?: string;
          category?: string;
          paymentMethod?: string;
        }

        const formatted = data.map((sub: ApiSubscription) => ({
          id: sub._id,
          name: sub.name,
          amount: sub.price,
          nextRenewal: sub.startDate,
          frequency: sub.frequency,
          category: sub.category,
          paymentMethod: sub.paymentMethod,
        }));
        setSubscriptions(formatted);
      } catch (error) {
        console.error("Error loading subscriptions:", error);
      }
    };

    loadSubscriptions();
  }, []);

  const handleAddSubscription = async (sub: SubscriptionFormData) => {
    const token = getToken();
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    try {
      const subscription = await createSubscription(sub, token);
      const newSub: Subscription = {
        id: subscription._id,
        name: subscription.name,
        amount: subscription.price,
        nextRenewal: subscription.startDate,
        frequency: subscription.frequency,
        category: subscription.category,
        paymentMethod: subscription.paymentMethod,
      };
      setSubscriptions((prev) => [...prev, newSub]);
    } catch (err) {
      console.error("Failed to create subscription:", err);
      alert("Something went wrong. Check console for details.");
    }
  };

  const handleEditSubscription = async (updates: SubscriptionFormData) => {
    if (!editingSub) return;

    const token = getToken();
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    try {
      const updated = await apiUpdateSubscription(
        editingSub.id,
        updates,
        token
      );

      if (!updated || !updated._id) {
        console.error("❌ Invalid updated response:", updated);
        throw new Error("Missing _id in updated response");
      }

      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === editingSub.id
            ? {
                id: updated._id,
                name: updated.name,
                amount: updated.price,
                nextRenewal: updated.startDate,
                frequency: updated.frequency,
                category: updated.category,
                paymentMethod: updated.paymentMethod,
              }
            : sub
        )
      );

      setEditingSub(null);
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Something went wrong while updating. Check console for details.");
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    const token = getToken();
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    try {
      await apiDeleteSubscription(id, token);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1>My Subscriptions</h1>

      {!editingSub ? (
        <SubForm onSubmit={handleAddSubscription} />
      ) : (
        <>
          <h5>Editing Subscription</h5>
          <SubForm
            onSubmit={handleEditSubscription}
            initialData={{
              name: editingSub.name,
              price: editingSub.amount,
              startDate: editingSub.nextRenewal.split("T")[0],
              category: editingSub.category || "",
              paymentMethod: editingSub.paymentMethod || "",
              frequency: editingSub.frequency || "monthly",
            }}
          />
        </>
      )}

      <SubList
        subscriptions={subscriptions}
        onEdit={(sub) => setEditingSub(sub)}
        onDelete={handleDeleteSubscription}
      />
    </DashboardLayout>
  );
}

export default SubDashboard;
