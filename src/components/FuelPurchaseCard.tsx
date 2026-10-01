import type { FuelPurchase } from "../types/fuel";

interface FuelPurchaseCardProps {
    purchase: FuelPurchase;
    onEdit: (purchase: FuelPurchase) => void;
    onDelete: (id: string) => void;
}

function FuelPurchaseCard({
                              purchase,
                              onEdit,
                              onDelete,
                          }: FuelPurchaseCardProps) {
    return (
        <article className="purchase-card">
            <div className="purchase-card-header">
                <div>
                    <h3>{purchase.location || "Unknown Location"}</h3>
                    <span>{purchase.fillDate || "No fill date"}</span>
                </div>

                <strong>${purchase.totalCost.toFixed(2)}</strong>
            </div>

            <div className="purchase-details">
                <div>
                    <span>Price</span>
                    <strong>${purchase.pricePerGallon.toFixed(3)}/gal</strong>
                </div>

                <div>
                    <span>Gallons</span>
                    <strong>{purchase.gallons.toFixed(3)}</strong>
                </div>

                <div>
                    <span>Transaction</span>
                    <strong>{purchase.transactionNumber || "—"}</strong>
                </div>

                <div>
                    <span>Settlement</span>
                    <strong>{purchase.settlementDate || "—"}</strong>
                </div>
            </div>

            <div className="purchase-actions">
                <button
                    className="edit-button"
                    onClick={() => onEdit(purchase)}
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={() => onDelete(purchase.id)}
                >
                    Delete
                </button>
            </div>
        </article>
    );
}

export default FuelPurchaseCard;