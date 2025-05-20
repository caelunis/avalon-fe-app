import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

function renderROCChart(roc_curve, label) {
    return {
        labels: roc_curve?.fpr || [],
        datasets: [
            {
                label: `${label} ROC`,
                data: roc_curve?.tpr || [],
                borderColor: "#3b82f6",
                fill: false,
            },
        ],
    };
}

function renderExplainedVariance(variance) {
    return {
        labels: variance.map((_, i) => `PC${i + 1}`),
        datasets: [
            {
                label: "Explained Variance Ratio",
                data: variance,
                borderColor: "#10b981",
                backgroundColor: "#6ee7b7",
                fill: true,
            },
        ],
    };
}

function UnsupervisedResultsDecomposition({ data }) {
    const decomposition = data?.decomposition || {};

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Decomposition Results</h1>

            {Object.entries(decomposition).map(([method, result]) => (
                <div key={method} className="mb-10 border p-4 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-2xl text-white font-semibold capitalize mb-4">{method}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                            <p className="text-white">Accuracy: {result.accuracy ?? "-"}</p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                            <p className="text-white">F1 Score: {result.f1_score ?? "-"}</p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                            <p className="text-white">ROC AUC: {result.roc_auc ?? "-"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {result.roc_curve && (
                            <div>
                                <h3 className="text-xl text-white font-medium mb-2">ROC Curve</h3>
                                <Line
                                    data={renderROCChart(result.roc_curve, method)}
                                    options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                                />
                            </div>
                        )}

                        {method === "pca" && result.explained_variance_ratio && (
                            <div>
                                <h3 className="text-xl text-white font-medium mb-2">Explained Variance</h3>
                                <Line
                                    data={renderExplainedVariance(result.explained_variance_ratio)}
                                    options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                                />
                            </div>
                        )}
                    </div>

                    {method === "nmf" && result.reconstruction_err_ !== undefined && (
                        <div className="mt-4 bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow-md text-center">
                            <p className="text-white">Reconstruction Error: {result.reconstruction_err_}</p>
                        </div>
                    )}

                    {method === "pca" && result.noise_variance !== undefined && (
                        <div className="mt-4 bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow-md text-center">
                            <p className="text-white">Noise Variance: {result.noise_variance}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UnsupervisedResultsDecomposition;
