use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Our program's Program ID: {}", &program_id);
    let account_itter = &mut accounts.iter();
    let account = next_account_info(account_itter)?;

    if !account.is_writable {
        return Err(ProgramError::InvalidArgument);
    }
    let mut counter = Box::new(0u32);
    let data = &mut account.try_borrow_mut_data()?[..4];

    *counter = u32::from_le_bytes(data.try_into().unwrap_or_default()) + 1;
    data.clone_from_slice(&counter.to_le_bytes());
    Ok(())
}
