import { useEffect, useState } from "react";

// Components
import AddFuelForm from "../components/AddFuelForm";
import FuelSettings from "../components/FuelSettings";
import StatCard from "../components/StatCard";

// Types
import type { FuelPurchase } from "../types/fuel";

// Calculations
import {
    calculateAverageFuelPrice,
    calculateTargetFuelPrice,
    calculateTotalCost,
    calculateTotalGallons,
} from "../services/calculations";

// Load/Save
import {
    loadPurchases,
    loadSettings,
    savePurchases,
    saveSettings,
} from "../services/storage.ts";


function Dashboard() {

    // Initialize use state for MPG and Fuel Protection
    const [initializeSettings] = useState(loadSettings)
    const [fuelProtection, setFuelProtection] = useState(initializeSettings.fuelProtection);
    const [mpg, setMpg] = useState(initializeSettings.mpg);

    // Initialize use state for fuel purchases and fuel purchase form
    const [purchases, setPurchases] = useState<FuelPurchase[]>(loadPurchases);
    const [showAddFuel, setShowAddFuel] = useState(false);

    // Update and persist purchases
    useEffect(() => {
        savePurchases(purchases)
    }, [purchases]);

    // Update and persist settings
    useEffect(() => {
        saveSettings({
            fuelProtection,
            mpg,
        });
    }, [fuelProtection, mpg]);

    // Dashboard calculations
    const totalGallons = calculateTotalGallons(purchases);
    const totalCost = calculateTotalCost(purchases);
    const averagePrice = calculateAverageFuelPrice(purchases);
    const targetPrice = calculateTargetFuelPrice(fuelProtection, mpg);
    const difference = averagePrice - targetPrice;

    /**
     * Function to add a fuel purchase
     * @param purchase The purchase to be added to FuelPurchases
     */
    function handleAddPurchase(purchase: FuelPurchase) {
        setPurchases((currentPurchases) => [
            purchase,
            ...currentPurchases,
        ]);
        setShowAddFuel(false);
    }

    return (
        <div className="dashboard">
            <header className="app-header">
                <h1>Truck Fuel Tracker</h1>
                <p>Fuel cost & efficiency</p>
            </header>

            <FuelSettings
                fuelProtection={fuelProtection}
                mpg={mpg}
                onFuelProtectionChange={setFuelProtection}
                onMpgChange={setMpg}
            />

            <section className="target-card">
                <span>Target Fuel Price</span>
                <strong>${targetPrice.toFixed(2)} / gal</strong>
            </section>

            <section className="stats-grid">
                <StatCard
                    label="Average $/gal"
                    value={`$${averagePrice.toFixed(2)}`}
                />

                <StatCard
                    label="Total Cost"
                    value={`$${totalCost.toFixed(2)}`}
                />

                <StatCard
                    label="Gallons"
                    value={totalGallons.toFixed(1)}
                />

                <StatCard
                    label="Purchases"
                    value={purchases.length.toString()}
                />

                <StatCard
                    label="Vs. Target"
                    value={`${difference >= 0 ? "+" : ""}$${difference.toFixed(2)}`}
                />
            </section>

            <button
                className="add-fuel-button"
                onClick={() => setShowAddFuel(true)}
            >
                + Add Fuel Purchase
            </button>
            {showAddFuel && (
                <AddFuelForm
                    onAdd={handleAddPurchase}
                    onCancel={() => setShowAddFuel(false)}
                />
            )}
        </div>
    );
}

export default Dashboard;