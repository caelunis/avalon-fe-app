import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, Legend);

function UnsupervisedResultsDecomposition({ data }) {
    const varianceData = {
        labels: Array.from({ length: data?.decomposition?.pca?.explained_variance_ratio?.length || 4 }, (_, i) => i + 1),
        datasets: [
            {
                label: "Explained Variance Ratio",
                data: data?.decomposition?.pca?.explained_variance_ratio || [0, 0, 0, 0],
                borderColor: "#10b981",
                fill: false,
            },
        ],
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Результаты Decomposition</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">Noise Variance: {data?.decomposition?.pca?.noise_variance || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">N Components: {data?.decomposition?.pca?.n_components || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">Accuracy: {data?.decomposition?.pca?.Accuracy || 0}</p>
                </div>
            </div>
            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-2">Explained Variance Ratio</h2>
                <Line data={varianceData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </div>
        </div>
    );
}

export default UnsupervisedResultsDecomposition;