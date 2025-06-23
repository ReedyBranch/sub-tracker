import { useState } from "react";

interface SubFormProps {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
}

function SubForm(props: SubFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nextRenewal, setNextRenewal] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !amount || !nextRenewal) {
      alert("Please fill out all fields.");
      return;
    }

    const newSub = {
      id: props.id ?? crypto.randomUUID(), // this is a fallback ID so creating vs editing
      name,
      amount,
      nextRenewal,
    };

    console.log("Submitting subscription:", newSub);

    setName("");
    setAmount(0);
    setNextRenewal("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Subscription Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Amount Paying ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Next Renewal</label>
        <input
          type="date"
          value={nextRenewal}
          onChange={(e) => setNextRenewal(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SubForm;
