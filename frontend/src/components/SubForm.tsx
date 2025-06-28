import React, { useState, useEffect } from "react";

export interface SubscriptionFormProps {
  onSubmit: (subscription: {
    id?: string; // ✅ Optional when creating, required for editing
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
      id: initialData?.id, // ✅ Include ID for editing
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
        // Reset only if it's not editing
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
      <label>
        Subscription Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Amount Paying ($)
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Category
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <label>
        Payment Method
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        />
      </label>
      <label>
        Frequency
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        >
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </label>
      <label>
        Next Renewal
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">{initialData ? "Update" : "Submit"}</button>
    </form>
  );
};

export default SubForm;
