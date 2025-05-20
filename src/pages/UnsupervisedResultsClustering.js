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

function renderInertiaChart(inertiaResults) {
    return {
        labels: inertiaResults.map((_, i) => `k=${i + 1}`),
        datasets: [
            {
                label: "Inertia",
                data: inertiaResults,
                borderColor: "#ef4444",
                fill: false,
            },
        ],
    };
}

function UnsupervisedResultsClustering({ data }) {
    const clustering = data?.clustering || {};
    const { inertia_results = [], accuracy, f1_score } = clustering;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Clustering Results</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-white">Accuracy: {accuracy?.toFixed(3) ?? "-"}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-white">F1 Score: {f1_score?.toFixed(3) ?? "-"}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-white">Inertia Runs: {inertia_results.length}</p>
                </div>
            </div>

            {inertia_results.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Inertia Results</h2>
                    <Line
                        data={renderInertiaChart(inertia_results)}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: "top" } },
                            scales: {
                                x: { title: { display: true, text: "Number of Clusters (k)" } },
                                y: { title: { display: true, text: "Inertia" } },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default UnsupervisedResultsClustering;
