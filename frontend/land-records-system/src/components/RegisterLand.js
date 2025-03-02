import React, { useState } from "react";
import { getContract } from "../utils/contract";

const RegisterLand = () => {
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);

  const registerLand = async () => {
    if (!location || !size) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract(); // Ensure this returns a valid contract instance

      console.log("Contract instance:", contract);
      console.log("Available functions:", contract.interface.fragments.map(f => f.name));

      const transaction = await contract.registerProperty(location, size); // Correct function name
      alert("Transaction sent. Waiting for confirmation...");
      await transaction.wait();
      alert("Land registered successfully!");
    } catch (error) {
      console.error("Error registering land:", error);
      alert("Registration failed. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register Land</h2>
      <div style={styles.form}>
        <label>Location:</label>
        <input 
          type="text" 
          value={location} 
          placeholder="Enter land location"
          onChange={(e) => setLocation(e.target.value)} 
          style={styles.input} 
        />

        <label>Size (sq ft):</label>
        <input 
          type="number"  // Changed from text to number for proper validation
          value={size} 
          placeholder="Enter land size"
          onChange={(e) => setSize(e.target.value)} 
          style={styles.input} 
        />

        <button onClick={registerLand} style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default RegisterLand;
