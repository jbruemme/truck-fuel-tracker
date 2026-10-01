import { useState } from 'react';
import type { FuelPurchase } from "../types/fuel";
import FuelPurchaseCard from "./FuelPurchaseCard";

interface PurchaseHistoryProps {
    purchases: FuelPurchase[];
    onEdit: (purchase: FuelPurchase) => void;
    onDelete: (id: string) => void;
}

function PurchaseHistory({
                             purchases,
                             onEdit,
                             onDelete,
                         }: PurchaseHistoryProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="purchase-history">
            <button
                type="button"
                className="history-header"
                onClick={() => setIsExpanded((current) => !current)}
                aria-expanded={isExpanded}
            >
                <div>
                    <h2>Fuel Purchases</h2>
                    <span>{purchases.length} total</span>
                </div>

                <span className="history-expand-icon">
          {isExpanded ? "▲" : "▼"}
        </span>
            </button>

            {isExpanded && (
                <div className="history-content">
                    {purchases.length === 0 ? (
                        <div className="empty-history">
                            <p>No fuel purchases yet.</p>
                            <span>Your purchases will appear here.</span>
                        </div>
                    ) : (
                        purchases.map((purchase) => (
                            <FuelPurchaseCard
                                key={purchase.id}
                                purchase={purchase}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    );
}

export default PurchaseHistory;