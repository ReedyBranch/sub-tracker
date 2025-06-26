import React, { useState } from "react";

export interface SubscriptionFormProps {
  onSubmit: (subscription: {
    name: string;
    price: number;
    startDate: string;
    category: string;
    paymentMethod: string;
  }) => void;
}

const SubForm: React.FC<SubscriptionFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic field validation
    if (!name || !price || !startDate || !category || !paymentMethod) {
      alert("Please fill out all fields.");
      return;
    }

    // Trim and format the category to match backend enums
    const formattedCategory = category.trim().toLowerCase();

    const newSubscription = {
      name: name.trim(),
      price: Number(price),
      startDate,
      category: formattedCategory,
      paymentMethod: paymentMethod.trim(),
    };

    try {
      await onSubmit(newSubscription);
      // Clear form after submission
      setName("");
      setPrice(0);
      setStartDate("");
      setCategory("");
      setPaymentMethod("");
    } catch (error) {
      console.error("Failed to create subscription:", error);
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
          placeholder="e.g. technology"
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
        Next Renewal
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubForm;
