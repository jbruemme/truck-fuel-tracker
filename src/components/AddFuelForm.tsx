import { useState } from "react";
import type { FormEvent } from "react";
import type { FuelPurchase } from "../types/fuel";
import { calculateFuelCost } from "../services/calculations";

interface AddFuelFormProps {
    onAdd: (purchase: FuelPurchase) => void;
    onCancel: () => void;
}

function AddFuelForm({ onAdd, onCancel }: AddFuelFormProps) {
    const [settlementDate, setSettlementDate] = useState("");
    const [transactionNumber, setTransactionNumber] = useState("");
    const [fillDate, setFillDate] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerGallon, setPricePerGallon] = useState("");
    const [gallons, setGallons] = useState("");

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

        const newPurchase: FuelPurchase = {
            id: crypto.randomUUID(),
            settlementDate,
            transactionNumber,
            fillDate,
            location,
            pricePerGallon: price,
            gallons: gallonAmount,
            totalCost,
        };

        onAdd(newPurchase);
    }

    return (
        <section className="fuel-form-card">
            <div className="form-header">
                <h2>Add Fuel Purchase</h2>
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
                    Add Fuel Purchase
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