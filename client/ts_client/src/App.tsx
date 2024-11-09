import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./App.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";



function App() {
  const {publicKey} = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const [balance, setBalance] = useState<number | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<number>(0); // Amount to send

  const handleSubmit = () => {
    console.log(recipient, amount)
  }

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
          <p className="text-3xl font-bold underline">{balance}</p>
        ) : (
          <p>loading</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value) }
            required
            className="w-[100px] mt-[10px]"/>
          <input
            type="number"
            placeholder="Inter the of sol"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            required
            min={0}
            step={0.01}
          />
          <button type="submit">Send sol</button>
        </form>
      </main>
    </>
  );
}

export default App;
