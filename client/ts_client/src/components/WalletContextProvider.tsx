import { FC, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css"

interface WalletContextProviderProps {
  children: ReactNode;
}


export const WalletContextProvider: FC<WalletContextProviderProps> = ({children}) => {
  const network = clusterApiUrl("devnet");
  const wallet = [new PhantomWalletAdapter]
  return( 
  <ConnectionProvider endpoint={network}>
    <WalletProvider wallets={wallet} autoConnect={true}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)};
