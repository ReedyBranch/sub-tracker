import { useState } from "react";
import NavBar from "../components/NavBar";
import SubForm from "../components/SubForm";
import SubList from "../components/SubList";
import styles from "./SubDashboard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SubDashboard() {
  const [subscriptions, setSubscriptions] = useState<
    {
      id: string;
      name: string;
      amount: number;
      nextRenewal: string;
    }[]
  >([]);

  const [editingSub, setEditingSub] = useState<{
    id: string;
    name: string;
    amount: number;
    nextRenewal: string;
  } | null>(null);

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Add or Edit Submission Handler
  const handleSubmit = (sub: {
    id: string;
    name: string;
    amount: number;
    nextRenewal: string;
  }) => {
    const exists = subscriptions.some((s) => s.id === sub.id);

    if (exists) {
      setSubscriptions((prev) => prev.map((s) => (s.id === sub.id ? sub : s)));
    } else {
      setSubscriptions((prev) => [...prev, sub]);
    }

    setEditingSub(null);
    setIsFormVisible(false);
  };

  // Edit Click Handler
  const handleEdit = (sub: {
    id: string;
    name: string;
    amount: number;
    nextRenewal: string;
  }) => {
    setEditingSub(sub);
    setIsFormVisible(true);
  };

  // Delete Handler
  const handleDelete = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  return (
    <>
      <NavBar />

      <div className={styles.dashContainer}>
        <h1 className={styles.dashTitle}>Your Subscriptions</h1>

        {/* Toggle Form Button */}
        <div className="dashActions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingSub(null);
              setIsFormVisible(true);
            }}
          >
            + Add Subscription Here
          </button>
        </div>

        {/* Subscription Form (conditionally rendered) */}
        {isFormVisible && (
          <SubForm
            id={editingSub?.id || ""}
            name={editingSub?.name || ""}
            amount={editingSub?.amount || 0}
            nextRenewal={editingSub?.nextRenewal || ""}
            onSubmit={handleSubmit}
          />
        )}

        {/* Subscription List */}
        <div className="subList">
          <SubList
            subscriptions={subscriptions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default SubDashboard;
