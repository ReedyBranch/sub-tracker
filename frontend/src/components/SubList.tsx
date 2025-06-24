import SubItem from "./SubItem";
import styles from "../pages/SubDashboard.module.css";

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

function SubList({ subscriptions, onEdit, onDelete }: SubListProps) {
  return (
    <div className={styles.subList}>
      {subscriptions.length === 0 ? (
        <p className="text-muted text-center mt-5">No subscriptions found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {subscriptions.map((sub) => (
            <div className="col" key={sub.id}>
              <SubItem
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubList;
