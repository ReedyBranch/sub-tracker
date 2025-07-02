import React, { useState, useEffect } from "react";

export interface SubscriptionFormProps {
  onSubmit: (subscription: {
    id?: string;
    name: string;
    price: number;
    startDate: string;
    category: string;
    paymentMethod: string;
    frequency: string;
  }) => void;
  initialData?: {
    id?: string;
    name: string;
    price: number;
    startDate: string;
    category: string;
    paymentMethod: string;
    frequency: string;
  };
}

const SubForm: React.FC<SubscriptionFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [paymentMethod, setPaymentMethod] = useState(
    initialData?.paymentMethod || ""
  );
  const [frequency, setFrequency] = useState(
    initialData?.frequency || "monthly"
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setStartDate(initialData.startDate);
      setCategory(initialData.category);
      setPaymentMethod(initialData.paymentMethod);
      setFrequency(initialData.frequency);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !price ||
      !startDate ||
      !category ||
      !paymentMethod ||
      !frequency
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newSubscription = {
      id: initialData?.id,
      name: name.trim(),
      price: Number(price),
      startDate,
      category: category.trim().toLowerCase(),
      paymentMethod: paymentMethod.trim(),
      frequency,
    };

    try {
      await onSubmit(newSubscription);
      if (!initialData) {
        setName("");
        setPrice(0);
        setStartDate("");
        setCategory("");
        setPaymentMethod("");
        setFrequency("monthly");
      }
    } catch (error) {
      console.error("Failed to submit subscription:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Subscription Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Amount Paying ($)</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Payment Method</label>
          <input
            type="text"
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Frequency</label>
          <select
            className="form-select"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Next Renewal</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">
            {initialData ? "Update Subscription" : "Add Subscription"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubForm;
