import React, { useState } from "react";
import { BrowserProvider } from "ethers"; // Correct import for Ethers v6

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum); // Updated provider
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request accounts
        const signer = await provider.getSigner(); // Get signer
        const address = await signer.getAddress(); // Get wallet address
        setWalletAddress(address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
