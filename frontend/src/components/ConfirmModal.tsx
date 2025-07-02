import React from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        style={{
          background: "rgba(30, 30, 60, 0.95)",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          minWidth: "300px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "#dc3545", // red
              border: "none",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#6c757d", // gray
              border: "none",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
