import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
  import * as fs from "fs"
(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
  const filePath = process.env.SOLANA_KEYPAIR_PATH;
  if (!filePath) {
    console.error(filePath + " didn't exist");
    process.exit(1)
  }
  const solContent = fs.readFileSync(filePath, {encoding: "utf-8"})
  const keypair = Keypair.fromSecretKey(Uint8Array(JSON.parse(solContent)));
  console.log(keypair.publicKey);

})();
