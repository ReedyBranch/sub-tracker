import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SubForm from "../components/SubForm";
import SubList from "../components/SubList";
import ConfirmModal from "../components/ConfirmModal";
import "../App.css";
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subToDelete, setSubToDelete] = useState<string | null>(null);

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
            frequency?: string;
            category?: string;
            paymentMethod?: string;
          }) => ({
            id: sub._id,
            name: sub.name,
            amount: sub.price,
            nextRenewal: sub.startDate,
            frequency: sub.frequency,
            category: sub.category,
            paymentMethod: sub.paymentMethod,
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
    if (!token) return alert("Authentication token is missing.");

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
    if (!token) return alert("Authentication token is missing.");

    try {
      const updated = await apiUpdateSubscription(
        editingSub.id,
        updates,
        token
      );
      if (!updated || !updated._id)
        throw new Error("Missing _id in updated response");

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
      alert("Something went wrong while updating.");
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!subToDelete) return;
    const token = getToken();
    if (!token) return alert("Authentication token is missing.");

    try {
      await apiDeleteSubscription(subToDelete, token);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== subToDelete));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete subscription.");
    } finally {
      setShowConfirmModal(false);
      setSubToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="subdashboard px-3 py-5 fade-in">
        <h1 className="text-center mb-5 text-glow">My Subscriptions</h1>

        <div className="card glass-card shadow-sm mb-5">
          <div className="card-body">
            <h5 className="card-title mb-3">
              {editingSub ? "Edit Subscription" : "Add Subscription"}
            </h5>

            <SubForm
              onSubmit={
                editingSub ? handleEditSubscription : handleAddSubscription
              }
              initialData={
                editingSub
                  ? {
                      name: editingSub.name,
                      price: editingSub.amount,
                      startDate: editingSub.nextRenewal.split("T")[0],
                      category: editingSub.category || "",
                      paymentMethod: editingSub.paymentMethod || "",
                      frequency: editingSub.frequency || "monthly",
                    }
                  : undefined
              }
            />

            {editingSub && (
              <div className="text-end mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setEditingSub(null)}
                >
                  Cancel Edit
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <SubList
            subscriptions={subscriptions}
            onEdit={(sub) => setEditingSub(sub)}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this subscription?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirmModal(false);
            setSubToDelete(null);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default SubDashboard;
