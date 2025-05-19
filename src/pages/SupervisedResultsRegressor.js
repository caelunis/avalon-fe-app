import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, Legend);

function SupervisedResultsRegressor({ data }) {
    const cvData = {
        labels: Array.from({ length: data?.regression?.knn?.cv_results?.MAE?.length || 4 }, (_, i) => i + 1),
        datasets: [
            {
                label: "MAE (Cross-Validation)",
                data: data?.regression?.knn?.cv_results?.MAE || [0, 0, 0, 0],
                borderColor: "#ef4444",
                fill: false,
            },
        ],
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Результаты Regressor</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">R²: {data?.regression?.knn?.metrics?.R2 || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">MAE: {data?.regression?.knn?.metrics?.MAE || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">D2MAE: {data?.regression?.knn?.metrics?.D2MAE || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg">Best k: {data?.regression?.knn?.cv_results?.best_k || 0}</p>
                </div>
            </div>
            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-2">MAE (Cross-Validation)</h2>
                <Line data={cvData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </div>
        </div>
    );
}

export default SupervisedResultsRegressor;