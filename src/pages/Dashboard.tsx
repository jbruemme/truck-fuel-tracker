import StatCard from "../components/StatCard";
import type { FuelPurchase } from "../types/fuel";

import {
    calculateAverageFuelPrice,
    calculateTargetFuelPrice,
    calculateTotalCost,
    calculateTotalGallons,
} from "../services/calculations";


function Dashboard() {
    const fuelProtection = 0.5;
    const mpg = 7;

    const purchases: FuelPurchase[] = [
        {
            id: "1",
            settlementDate: "2026-09-25",
            transactionNumber: "10001",
            fillDate: "2026-09-24",
            location: "Love's",
            pricePerGallon: 3.19,
            gallons: 87.3,
            totalCost: 278.487,
        },
        {
            id: "2",
            settlementDate: "2026-09-23",
            transactionNumber: "10002",
            fillDate: "2026-09-22",
            location: "Flying J",
            pricePerGallon: 3.29,
            gallons: 102.8,
            totalCost: 338.212,
        },
    ];

    const totalGallons = calculateTotalGallons(purchases);
    const totalCost = calculateTotalCost(purchases);
    const averagePrice = calculateAverageFuelPrice(purchases);
    const targetPrice = calculateTargetFuelPrice(fuelProtection, mpg);

    const difference = averagePrice - targetPrice;

    return (
        <div className="dashboard">
            <header className="app-header">
                <h1>Truck Fuel Tracker</h1>
                <p>Fuel cost & efficiency</p>
            </header>

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

            <button className="add-fuel-button">
                + Add Fuel Purchase
            </button>
        </div>
    );
}

export default Dashboard;