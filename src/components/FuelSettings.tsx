interface FuelSettingsProps {
    fuelProtection: number;
    mpg: number;
    onFuelProtectionChange: (value: number) => void;
    onMpgChange: (value: number) => void;
}

function FuelSettings({
                          fuelProtection,
                          mpg,
                          onFuelProtectionChange,
                          onMpgChange,
                      }: FuelSettingsProps) {
    return (
        <section className="fuel-settings-card">
            <h2>Fuel Settings</h2>

            <div className="settings-grid">
                <div className="form-field">
                    <label htmlFor="fuelProtection">
                        Fuel Protection ($ per mile)
                    </label>

                    <input
                        id="fuelProtection"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.001"
                        value={fuelProtection || ""}
                        placeholder="0.50"
                        onChange={(event) =>
                            onFuelProtectionChange(Number(event.target.value))
                        }
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="mpg">
                        Miles Per Gallon
                    </label>

                    <input
                        id="mpg"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        value={mpg || ""}
                        placeholder="7.00"
                        onChange={(event) =>
                            onMpgChange(Number(event.target.value))
                        }
                    />
                </div>
            </div>
        </section>
    );
}

export default FuelSettings;