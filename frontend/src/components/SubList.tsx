import React from "react";
import SubItem from "./SubItem";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  url?: string;
  title?: string;
  frequency?: string;
  category?: string;
  paymentMethod?: string;
}

interface SubListProps {
  subscriptions: Subscription[];
  onEdit?: (sub: Subscription) => void;
  onDelete?: (id: string) => void;
}

const SubList: React.FC<SubListProps> = ({
  subscriptions,
  onEdit,
  onDelete,
}) => {
  if (subscriptions.length === 0) {
    return (
      <p className="text-muted text-center">
        You have no subscriptions added yet.
      </p>
    );
  }

  return (
    <div className="row">
      {subscriptions.map((sub) => (
        <div key={sub.id} className="col-12 col-md-6 col-lg-4 mb-4">
          <SubItem subscription={sub} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default SubList;
