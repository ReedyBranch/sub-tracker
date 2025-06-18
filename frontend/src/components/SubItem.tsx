interface Subscription {
  url: string;
  title: string;
}

interface SubItemProps {
  subscription: Subscription;
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
