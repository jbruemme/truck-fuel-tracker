interface StatCardProps {
    label: string;
    value: string;
}

/**
 * Reusable stat card
 * @param param0
 * @param param0.label Title label
 * @param param0.value Display value
 * @constructor
 */
function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="stat-card">
            <span className="stat-label">{label}</span>
            <strong className="stat-value">{value}</strong>
        </div>
    );
}

export default StatCard;