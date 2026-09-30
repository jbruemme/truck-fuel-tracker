import type { FuelPurchase, FuelSettings } from "../types/fuel";

const PURCHASES_KEY = "truckFuelTracker_purchases";
const SETTINGS_KEY = "truckFuelTracker_settings";

/**
 * Function to save fuel purchases to local storage
 * @param purchases The purchases being saved
 */
export function savePurchases(purchases: FuelPurchase[]): void {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
}

/**
 * Function to load fuel purchases from local storage
 */
export function loadPurchases(): FuelPurchase[] {
    const storedPurchases = localStorage.getItem(PURCHASES_KEY);

    if (!storedPurchases) {
        return [];
    }

    try {
        return JSON.parse(storedPurchases) as FuelPurchase[];
    } catch {
        return [];
    }
}

/**
 * Function to save fuel settings to local storage
 * @param settings The settings being saved
 */
export function saveSettings(settings: FuelSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/**
 * Function to load settings from local storage
 */
export function loadSettings(): FuelSettings {
    const storedSettings = localStorage.getItem(SETTINGS_KEY);

    // Base case settings
    if (!storedSettings) {
        return {
            fuelProtection: 0.5,
            mpg: 7,
        };
    }

    try {
        return JSON.parse(storedSettings) as FuelSettings;
    } catch {
        return {
            fuelProtection: 0.5,
            mpg: 7,
        };
    }
}