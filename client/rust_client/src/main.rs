use solana_client::nonblocking::rpc_client::RpcClient;

fn main() {
    let client = RpcClient::new("devnet".to_string());
    let name = "this is not my counter";

    println!("Hello, world!");
}
