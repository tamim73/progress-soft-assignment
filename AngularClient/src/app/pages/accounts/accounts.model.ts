export interface IAccount {

    id?: string;

    accountNumber: number;

    accountHolderName: string;

    // Account Description, string value up to 1000 character.
    accountDescription?: string;

    // Account Number, 6 digits number and unique.
    accountHolderPhoneNumber?: string;
}


