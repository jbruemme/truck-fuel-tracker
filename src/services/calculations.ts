import type { FuelPurchase } from "../types/fuel";

/**
 * Function to calculate target fuel price based on fuel protection and mpg
 * @param fuelProtection Rate per mile of fuel protection
 * @param mpg Miles Per Gallon for trip
 */
export function calculateTargetFuelPrice (fuelProtection: number, mpg: number): number {
    if (fuelProtection <= 0|| mpg <= 0) {
        return 0;
    }

    return fuelProtection * mpg;
}

/**
 * Function to calculate actual fuel cost
 * @param pricePerGallon Price per gallon
 * @param gallons Total gallons purchased
 */
export function calculateFuelCost (pricePerGallon: number, gallons: number): number {
    return pricePerGallon * gallons;
}

/**
 * Function to calculate total gallons of all fuel purchases
 * @param purchases Array of all purchases
 */
export function calculateTotalGallons (purchases: FuelPurchase[]): number {
    return purchases.reduce((total, purchase) => total + purchase.gallons, 0);
}

/**
 * Function to calculate the total cost of all purchases
 * @param purchases
 */
export function calculateTotalCost(purchases: FuelPurchase[]): number {
    return purchases.reduce((total, purchase) => total + purchase.totalCost, 0);
}

/**
 * Function to calculate the average cost of all fuel purchases
 * @param purchases Array of all purchases
 */
export function calculateAverageFuelPrice (purchases: FuelPurchase[]): number {
    const gallons = calculateTotalGallons(purchases);

    if (gallons == 0) {
        return 0;
    }

    return calculateTotalCost(purchases) / gallons;
}

/**
 * Function to calculate our current target cost based on target price and number of gallons
 * @param purchase The purchase storing target price and gallons
 */
export function calculateTargetCost (purchase: FuelPurchase): number {
    return purchase.targetPrice * purchase.gallons;
}

/**
 * Function to calculate the difference between the target price of a purchase and the target cost of a purchase
 * @param purchase The purchase used for the calculation
 */
export function calculatePurchaseDifference (purchase: FuelPurchase): number {
    return purchase.targetPrice - calculateTargetCost(purchase);
}

/**
 * Cumulative function to calculate the total target cost based on all individual fuel purchase target costs
 * @param purchases Array of all recorded purchases
 */
export function calculateTotalTargetCost (purchases: FuelPurchase []): number {
    return purchases.reduce((total, purchase) => total + calculateTargetCost(purchase), 0);
}

/**
 * Cumulative function to calculate the total difference between total cost and our total target cost
 * @param purchases Array of all recorded purchases
 */
export function calculateTotalDifference (purchases: FuelPurchase []): number {
    return (calculateTotalCost(purchases) - calculateTotalTargetCost(purchases));
}

/**
 * Function to calculate price difference per gallon between target and actual
 * @param purchases Array of all recorded purchases
 */
export function calculateDifferencePerGallon (purchases: FuelPurchase []): number {
    const gallons = calculateTotalGallons(purchases);

    if (gallons == 0) {
        return 0;
    }

    return calculateTotalDifference(purchases) / gallons;
}