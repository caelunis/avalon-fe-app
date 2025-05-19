import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, Legend);

function UnsupervisedResultsClustering({ data }) {
    const rocData = {
        labels: data?.clustering?.roc_curve?.fpr || [0, 0.2, 0.4, 0.6, 0.8, 1],
        datasets: [
            {
                label: "ROC Curve",
                data: data?.clustering?.roc_curve?.tpr || [0, 0.1, 0.4, 0.8, 0.95, 1],
                borderColor: "#3b82f6",
                fill: false,
            },
        ],
    };

    const inertiaData = {
        labels: Array.from({ length: data?.clustering?.inertia_results?.length || 4 }, (_, i) => i + 1),
        datasets: [
            {
                label: "Inertia Results",
                data: data?.clustering?.inertia_results || [0, 0, 0, 0],
                borderColor: "#ef4444",
                fill: false,
            },
        ],
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Результаты Clustering</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">Accuracy: {data?.clustering?.Accuracy || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">F1-Score: {data?.clustering?.f1_score || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">ROC AUC: {data?.clustering?.roc_auc || 0}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">ROC Curve</h2>
                    <Line data={rocData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Inertia Results</h2>
                    <Line data={inertiaData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                </div>
            </div>
        </div>
    );
}

export default UnsupervisedResultsClustering;