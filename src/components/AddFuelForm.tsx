// React
import { useState } from "react";

// Types
import type { FormEvent } from "react";
import type { FuelPurchase } from "../types/fuel";

// Calculations
import {
    calculateFuelCost,
    calculateTargetFuelPrice,
} from "../services/calculations";


interface AddFuelFormProps {
    purchase?: FuelPurchase | null;
    fuelProtection: number;
    mpg: number;
    onSave: (purchase: FuelPurchase) => void;
    onCancel: () => void;
}

function AddFuelForm({purchase, fuelProtection, mpg, onSave, onCancel, }: AddFuelFormProps) {

    const [settlementDate, setSettlementDate] = useState(purchase?.settlementDate ?? "");
    const [transactionNumber, setTransactionNumber] = useState(purchase?.transactionNumber ?? "");
    const [fillDate, setFillDate] = useState(purchase?.fillDate ?? "");
    const [location, setLocation] = useState(purchase?.location ?? "");
    const [pricePerGallon, setPricePerGallon] = useState(purchase?.pricePerGallon ?? "");
    const [gallons, setGallons] = useState(purchase?.gallons ?? "");

    const price = Number(pricePerGallon);
    const gallonAmount = Number(gallons);

    const totalCost =
        price > 0 && gallonAmount > 0
            ? calculateFuelCost(price, gallonAmount)
            : 0;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (price <= 0 || gallonAmount <= 0) {
            return;
        }

        const purchaseFuelProtection = purchase?.fuelProtection ?? fuelProtection;
        const purchaseMpg = purchase?.mpg ?? mpg;
        const targetPrice = purchase?.targetPrice ?? calculateTargetFuelPrice(purchaseFuelProtection, purchaseMpg);

        const savedPurchase: FuelPurchase = {
            id: purchase?.id ?? crypto.randomUUID(),
            settlementDate,
            transactionNumber,
            fillDate,
            location,
            pricePerGallon: price,
            gallons: gallonAmount,
            totalCost,
            fuelProtection: purchaseFuelProtection,
            mpg: purchaseMpg,
            targetPrice,
        };

        onSave(savedPurchase);
    }

    return (
        <section className="fuel-form-card">
            <div className="form-header">
                <h2>{purchase ? "Edit Fuel Purchase" : "Add Fuel Purchase"}</h2>
                <button
                    type="button"
                    className="close-button"
                    onClick={onCancel}
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-field">
                        <label htmlFor="settlementDate">Settlement Date</label>
                        <input
                            id="settlementDate"
                            type="date"
                            value={settlementDate}
                            onChange={(event) => setSettlementDate(event.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="transactionNumber">
                            Transaction Number
                        </label>
                        <input
                            id="transactionNumber"
                            type="text"
                            value={transactionNumber}
                            onChange={(event) =>
                                setTransactionNumber(event.target.value)
                            }
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="fillDate">Fill Date</label>
                        <input
                            id="fillDate"
                            type="date"
                            value={fillDate}
                            onChange={(event) => setFillDate(event.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            type="text"
                            placeholder="City / truck stop"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="pricePerGallon">
                            Price per Gallon
                        </label>
                        <input
                            id="pricePerGallon"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.001"
                            placeholder="3.499"
                            value={pricePerGallon}
                            onChange={(event) =>
                                setPricePerGallon(event.target.value)
                            }
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="gallons">Gallons Purchased</label>
                        <input
                            id="gallons"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.001"
                            placeholder="100.000"
                            value={gallons}
                            onChange={(event) => setGallons(event.target.value)}
                        />
                    </div>
                </div>

                <div className="calculated-cost">
                    <span>Total Cost</span>
                    <strong>${totalCost.toFixed(2)}</strong>
                </div>

                <button
                    type="submit"
                    className="save-fuel-button"
                    disabled={price <= 0 || gallonAmount <= 0}
                >
                    {purchase ? "Save Changes" : "Add Fuel Purchase"}
                </button>

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </form>
        </section>
    );
}

export default AddFuelForm;