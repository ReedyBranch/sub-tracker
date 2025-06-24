import { useState, useEffect } from "react";
import styles from "./SubForm.module.css"; // ✅ Import your CSS module

interface SubFormProps {
  id: string;
  name: string;
  amount: number;
  nextRenewal: string;
  onSubmit?: (sub: {
    id: string;
    name: string;
    amount: number;
    nextRenewal: string;
  }) => void;
}

function SubForm(props: SubFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nextRenewal, setNextRenewal] = useState("");

  useEffect(() => {
    setName(props.name);
    setAmount(props.amount);
    setNextRenewal(props.nextRenewal);
  }, [props.name, props.amount, props.nextRenewal]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !amount || !nextRenewal) {
      alert("Please fill out all fields.");
      return;
    }

    const newSub = {
      id: props.id ?? crypto.randomUUID(),
      name,
      amount,
      nextRenewal,
    };

    props.onSubmit?.(newSub);

    setName("");
    setAmount(0);
    setNextRenewal("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={`form-group ${styles.formGroup}`}>
        <label className="form-label">Subscription Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={`form-group ${styles.formGroup}`}>
        <label className="form-label">Amount Paying ($)</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
      </div>

      <div className={`form-group ${styles.formGroup}`}>
        <label className="form-label">Next Renewal</label>
        <input
          type="date"
          className="form-control"
          value={nextRenewal}
          onChange={(e) => setNextRenewal(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${styles.fullWidthButton}`}
      >
        Submit
      </button>
    </form>
  );
}

export default SubForm;
