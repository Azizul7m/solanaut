import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./App.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function App() {
  const {publicKey} = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const [balance, setBalance] = useState<number | null>(null);
  return (
    <>
      <main>
        <WalletMultiButton />
      </main>
    </>
  );
}

export default App;
