interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  url?: string;
  title?: string;
}

interface SubItemProps {
  subscription: Subscription;
  onEdit?: (sub: Subscription) => void;
  onDelete?: (id: string) => void;
}

function SubItem({ subscription, onEdit, onDelete }: SubItemProps) {
  const handleDetailsClick = () => {
    alert("clicked");
  };

  return (
    <div className="card h-100 shadow-sm">
      {/* Optional image */}
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
          <strong>Next Renewal:</strong> {subscription.nextRenewal}
        </p>
        <button
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={handleDetailsClick}
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
  );
}

export default SubItem;
