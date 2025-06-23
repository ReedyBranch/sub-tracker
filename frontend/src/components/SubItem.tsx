interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  url?: string; // optional for now
  title?: string; // optional for now
}

interface SubItemProps {
  subscription: Subscription;
  onEdit?: (sub: Subscription) => void;
  onDelete?: (id: string) => void;
}

function SubItem({ subscription }: SubItemProps) {
  function onDetailsClick() {
    alert("clicked");
  }

  return (
    <div className="sub-item">
      <div className="sub-image">
        <img src={subscription.url} alt={subscription.title} />
        <div className="sub-overlay">
          <button className="details-btn" onClick={onDetailsClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubItem;
