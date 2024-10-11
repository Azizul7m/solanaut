use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

entrypoint!(ps_ins);

pub fn ps_ins(_pm_id: &Pubkey, acc: &[AccountInfo], _data: &[u8]) -> ProgramResult {
    let acc_itter = &mut acc.iter();
    let _account = next_account_info(acc_itter)?;
    let _signer = next_account_info(acc_itter)?;
    msg!("Hello native program");
    Ok(())
}
