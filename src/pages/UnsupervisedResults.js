import { Link } from "react-router-dom";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function UnsupervisedResults() {
    const metrics = window.metrics || { silhouette: 0.85, dbi: 0.45 };

    const scatterData = {
        datasets: [
            {
                label: "Кластер 1",
                data: [
                    { x: 1, y: 2 },
                    { x: 1.5, y: 2.5 },
                    { x: 0.5, y: 1.5 },
                ],
                backgroundColor: "#3b82f6",
            },
            {
                label: "Кластер 2",
                data: [
                    { x: 4, y: 5 },
                    { x: 4.5, y: 5.5 },
                    { x: 3.5, y: 4.5 },
                ],
                backgroundColor: "#ef4444",
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Результаты Unsupervised Learning</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Silhouette Score: {metrics.silhouette}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Davies-Bouldin Index: {metrics.dbi}</p>
                    </div>
                </div>
                <div className="max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-2">Кластеризация</h2>
                    <Scatter data={scatterData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                </div>
                <Link to="/unsupervised" className="block mt-6 text-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Вернуться назад
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default UnsupervisedResults;