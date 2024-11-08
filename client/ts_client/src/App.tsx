import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./App.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";



function App() {
  const {publicKey} = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if(publicKey) {
        try{
          const balanceInLamport = await connection.getBalance(publicKey);
          setBalance(balanceInLamport / LAMPORTS_PER_SOL);
        } catch(error) {
          console.error("Failed to fetch balance: ", error )
        }
      }
    };

    fetchBalance();
  }, [publicKey, connection])
  return (
    <>
      <main>
        <WalletMultiButton />
        {publicKey? (
          <p>{balance}</p>
        ) : (
          <p>loading<span>😃</span></p>
        )}
      </main>
    </>
  );
}

export default App;
