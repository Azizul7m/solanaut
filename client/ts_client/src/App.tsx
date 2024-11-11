import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./App.css";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { FormEvent, useEffect, useState } from "react";

function App() {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const [balance, setBalance] = useState<number | null>(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<number>(0); // Amount to send
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!publicKey) {
      setStatus("Wallet not connected");
      return;
    }
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: amount * LAMPORTS_PER_SOL,
        }),
      );
      const signature = await sendTransaction(transaction, connection);
      setStatus(`Transaction sent! Signature: ${signature}`);
      console.log("Transaction signature: ", signature);
    } catch (err) {
      console.log("Transaction failed:", err);
      setStatus("Transaction faild, See console for details");
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balanceInLamport = await connection.getBalance(publicKey);
          setBalance(balanceInLamport / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to fetch balance: ", error);
        }
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  const style = {
    inputBox: "outline-none px-2 rounded-md",
  };
  return (
    <>
      <main>
        <WalletMultiButton />
        {publicKey ? <p>{balance}</p> : <p>loading</p>}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            className={style.inputBox}
          />
          <input
            type="number"
            placeholder="Inter the of sol"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            min={0}
            step={0.01}
            className={style.inputBox}
          />
          <button className="bg-blue-500 p-md" type="submit">
            Send
          </button>
        </form>
        {status && <p className="mt-[10px]">{status}</p>}
      </main>
    </>
  );
}

export default App;
