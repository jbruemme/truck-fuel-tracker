/**
 * Interface for fuel purchases
 */
export interface FuelPurchase {
    id: string;

    settlementDate: string;
    transactionNumber: string;
    fillDate: string;
    location: string;

    pricePerGallon: number;
    gallons: number;
    totalCost: number;
}

/**
 * Interface for Fuel Protection settings
 */
export interface FuelSettings {
    fuelProtection: number;
    mpg: number;
}