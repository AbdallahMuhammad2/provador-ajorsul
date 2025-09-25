interface Measurement {
    value: number;
    weight: number;
}

class FingerWidthAnalyzer {
    private measurements: Measurement[];
    private maxWeight: number;
    public currentWeight: number;
    public totalSamples: number = 0;

    constructor(maxWeight: number = 16) {
        this.measurements = [];
        this.maxWeight = maxWeight;
        this.currentWeight = 0;
    }

    // Method to add a new measurement with weight
    addMeasurement(value: number, weight: number): boolean {
        if (value < 0.5) return false;
        // Add the new measurement
        this.measurements.push({ value, weight });
        this.currentWeight += weight;

        // Remove the oldest measurements until the total weight is below the maxWeight
        while (this.currentWeight > this.maxWeight) {
            const removed = this.measurements.shift();
            if (removed) {
                this.currentWeight -= removed.weight;
            }
        }

        this.totalSamples++;

        return true;
    }

    // Method to calculate the weighted median
    private calculateWeightedMedian(values: Measurement[]): number {
        if (values.length === 0) return 0;

        // Sort by value
        values.sort((a, b) => a.value - b.value);

        // Calculate the cumulative weight
        const totalWeight = values.reduce((sum, { weight }) => sum + weight, 0);
        let cumulativeWeight = 0;

        for (const { value, weight } of values) {
            cumulativeWeight += weight;
            if (cumulativeWeight >= totalWeight / 2) {
                return value;
            }
        }

        return 0; // Fallback in case of an error
    }

    // Method to calculate the IQR and filter outliers
    private filterOutliersIQR(values: Measurement[]): Measurement[] {
        const sortedValues = [...values].sort((a, b) => a.value - b.value);

        const q1Index = Math.floor(sortedValues.length / 4);
        const q3Index = Math.floor(sortedValues.length * (3 / 4));
        const q1 = sortedValues[q1Index].value;
        const q3 = sortedValues[q3Index].value;
        const iqr = q3 - q1;

        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        return sortedValues.filter(({ value }) => value >= lowerBound && value <= upperBound);
    }

    getStandardDeviation(): number {
        if (this.measurements.length === 0) return 0;

        const mean = this.getAverageFingerWidth();
        const squaredDifferences = this.measurements.map(({ value }) => (value - mean) ** 2);
        const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / this.measurements.length;

        return Math.sqrt(variance);
    }

    // Method to get the robust average finger width
    getAverageFingerWidth(): number {
        if (this.measurements.length === 0) return 0;

        // Filter outliers using IQR
        const filteredMeasurements = this.filterOutliersIQR(this.measurements);

        // Calculate the weighted median of the filtered measurements
        return this.calculateWeightedMedian(filteredMeasurements);
    }

    reset() {
        this.measurements = [];
        this.currentWeight = 0;
    }
}

// Export the class for use in other modules
export { FingerWidthAnalyzer };
