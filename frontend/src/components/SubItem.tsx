import { useState } from "react";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  category?: string;
  paymentMethod?: string;
  frequency?: string;
  url?: string;
  title?: string;
}

interface SubItemProps {
  subscription: Subscription;
  onEdit?: (sub: Subscription) => void;
  onDelete?: (id: string) => void;
}

function SubItem({ subscription, onEdit, onDelete }: SubItemProps) {
  const [showModal, setShowModal] = useState(false);

  const formattedDate = new Date(subscription.nextRenewal).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <>
      <div className="card h-100 shadow-sm">
        {subscription.url && (
          <img
            src={subscription.url}
            className="card-img-top"
            alt={subscription.title || "Subscription image"}
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{subscription.name}</h5>
          <p className="card-text mb-1">
            <strong>Amount:</strong> ${subscription.amount.toFixed(2)}
          </p>
          <p className="card-text">
            <strong>Next Renewal:</strong> {formattedDate}
          </p>
          <button
            className="btn btn-outline-primary btn-sm mt-2"
            onClick={() => setShowModal(true)}
          >
            Details
          </button>
        </div>

        <div className="card-footer d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => onEdit?.(subscription)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete?.(subscription.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{subscription.name}</h2>
            <p>
              <strong>Amount:</strong> ${subscription.amount.toFixed(2)}
            </p>
            <p>
              <strong>Category:</strong> {subscription.category || "N/A"}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {subscription.paymentMethod || "N/A"}
            </p>
            <p>
              <strong>Frequency:</strong> {subscription.frequency || "N/A"}
            </p>
            <p>
              <strong>Next Renewal:</strong> {formattedDate}
            </p>
            {subscription.url && (
              <img
                src={subscription.url}
                alt="Subscription"
                style={{
                  maxWidth: "100%",
                  borderRadius: "10px",
                  marginTop: "1rem",
                }}
              />
            )}
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubItem;
