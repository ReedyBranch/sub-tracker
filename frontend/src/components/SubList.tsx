import SubItem from "./SubItem";
import styles from "./SubDashboard.module.css";

interface SubListProps {
  subscriptions: {
    id: string;
    name: string;
    amount: number;
    nextRenewal: string;
  }[];
  onEdit?: (sub: {
    id: string;
    name: string;
    amount: number;
    nextRenewal: string;
  }) => void;
  onDelete?: (id: string) => void;
}

function SubList(props: SubListProps) {
  const { subscriptions, onEdit, onDelete } = props;

  return (
    <div className={`list-group ${styles.subList}`}>
      {subscriptions.length === 0 ? (
        <p className="text-muted">No subscriptions found.</p>
      ) : (
        subscriptions.map((sub) => (
          <SubItem
            key={sub.id}
            subscription={{
              id: sub.id,
              name: sub.name,
              amount: sub.amount,
              nextRenewal: sub.nextRenewal,
              url: "",
              title: "",
            }}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default SubList;
