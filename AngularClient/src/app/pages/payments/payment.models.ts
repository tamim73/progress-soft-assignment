export interface IPayment {

    id?: string;

    // Amount, positive numeric value.
    amount: number;

    // Currency Code, string value must be one of the currencies list values.
    currencyCode: string;

    destinationAccountNumber: number;

    sourceAccountNumber: number;

    // Destination Account Number, must be different than the Source Account Number.
    paymentDescription?: string;

}
