// Reacct
import { useEffect, useState } from "react";

// Components
import AddFuelForm from "../components/AddFuelForm";
import FuelSettings from "../components/FuelSettings";
import StatCard from "../components/StatCard";
import PurchaseHistory from "../components/PurchaseHistory";


// Types
import type { FuelPurchase } from "../types/fuel";

// Calculations
import {
    calculateAverageFuelPrice,
    calculateTargetFuelPrice,
    calculateTotalCost,
    calculateTotalGallons,
    calculateTotalDifference,
    calculateTotalTargetCost,
    calculateDifferencePerGallon,
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

    // Initialize use state for editing a fuel purchase
    const [editingPurchase, setEditingPurchase] = useState<FuelPurchase | null>(null);

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
    const totalTargetCost = calculateTotalTargetCost(purchases);
    const totalDifference = calculateTotalDifference(purchases);
    const differencePerGallon = calculateDifferencePerGallon(purchases);

    // Performance Status
    const performanceStatus = purchases.length === 0 ? "neutral" : totalDifference <= 0 ? "under-target" : "over-target";
    /**
     * Function to handle saving a fuel purchase (adding or editing)
     * @param purchase The purchase to be saved to FuelPurchases
     */
    function handleSavePurchase(purchase: FuelPurchase) {
        setPurchases((currentPurchases) => {
            const exists = currentPurchases.some(
                (current) => current.id === purchase.id
            );

            if (exists) {
                return currentPurchases.map((current) =>
                    current.id === purchase.id ? purchase : current
                );
            }

            return [purchase, ...currentPurchases];
        });

        setEditingPurchase(null);
        setShowAddFuel(false);
    }

    /**
     * Function to delete a fuel purchase
     * @param id The id of the fule purchase to be deleted
     */
    function handleDeletePurchase(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this fuel purchase?"
        );

        if (!confirmed) {
            return;
        }

        setPurchases((currentPurchases) =>
            currentPurchases.filter((purchase) => purchase.id != id)
        );
    }

    /**
     * Function to edit a fuel purchase
     * @param purchase The fuel purchase being edited
     */
    function handleEditPurchase(purchase: FuelPurchase) {
        setEditingPurchase(purchase);
        setShowAddFuel(true);
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
                    label="Actual Cost"
                    value={`$${totalCost.toFixed(2)}`}
                />

                <StatCard
                    label="Target Cost"
                    value={`$${totalTargetCost.toFixed(2)}`}
                />

                <StatCard
                    label="Gallons"
                    value={totalGallons.toFixed(1)}
                />

                <StatCard
                    label="Purchases"
                    value={purchases.length.toString()}
                />
            </section>

            <section className={`performance-card ${performanceStatus}`}>
                <span>Fuel Performance</span>

                {purchases.length === 0 ? (
                    <>
                        <strong>No purchase data yet</strong>
                        <p>Add a fuel purchase to begin tracking performance.</p>
                    </>
                ) : (
                    <>

                        <strong>
                            ${Math.abs(totalDifference).toFixed(2)}{" "}
                            {totalDifference <= 0 ? "UNDER" : "OVER"} TARGET
                        </strong>

                        <p>
                            ${Math.abs(differencePerGallon).toFixed(3)}/gal{" "}
                            {differencePerGallon <= 0 ? "under" : "over"}
                        </p>
                    </>
                )}
            </section>

            <button
                className="add-fuel-button"
                onClick={() => {
                    setEditingPurchase(null);
                    setShowAddFuel(true);
                }}
            >
                + Add Fuel Purchase
            </button>
            {showAddFuel && (
                <AddFuelForm
                    purchase={editingPurchase}
                    fuelProtection={fuelProtection }
                    mpg={mpg}
                    onSave={handleSavePurchase}
                    onCancel={() => {
                        setEditingPurchase(null);
                        setShowAddFuel(false);
                    }}
                />
            )}
            <PurchaseHistory
                purchases={purchases}
                onEdit={handleEditPurchase}
                onDelete={handleDeletePurchase}
            />
        </div>
    );
}

export default Dashboard;