// Import required modules from the solana-program crate
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

// Define program instruction
entrypoint!(process_instruction);

fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Native Program: Processing instruction...");

    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    // Verify the account has write permissions
    if !account.is_writable {
        return Err(ProgramError::InvalidArgument);
    }

    // Interpret the account's data as a mutable integer (u32)
    let counter = &mut account.try_borrow_mut_data()?[..4]; // Only taking first 4 bytes for simplicity
    let mut count = u32::from_le_bytes(counter.try_into().unwrap_or_default());

    // Increment the counter
    count += 1;
    msg!("Current count: {}", count);

    // Write the new count back to the account's data
    counter.copy_from_slice(&count.to_le_bytes());

    Ok(())
}
