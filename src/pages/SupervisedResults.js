import { Link } from "react-router-dom";
import { Scatter, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

function SupervisedResults() {
    const metrics = window.metrics || { accuracy: 0.95, precision: 0.93, recall: 0.94, f1: 0.94 };

    const confusionMatrixData = {
        datasets: [
            {
                label: "Confusion Matrix",
                data: [
                    { x: "Класс 1", y: "Класс 1", v: 50 },
                    { x: "Класс 1", y: "Класс 2", v: 5 },
                    { x: "Класс 2", y: "Класс 1", v: 3 },
                    { x: "Класс 2", y: "Класс 2", v: 42 },
                ],
                backgroundColor: (context) => {
                    const value = context.raw.v;
                    return value > 40 ? "#3b82f6" : value > 10 ? "#93c5fd" : "#dbeafe";
                },
            },
        ],
    };

    const rocData = {
        labels: [0, 0.2, 0.4, 0.6, 0.8, 1],
        datasets: [
            {
                label: "ROC Curve",
                data: [0, 0.1, 0.4, 0.8, 0.95, 1],
                borderColor: "#3b82f6",
                fill: false,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Результаты Supervised Learning</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Accuracy: {metrics.accuracy}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Precision: {metrics.precision}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Recall: {metrics.recall}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">F1-Score: {metrics.f1}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Confusion Matrix</h2>
                        <Scatter data={confusionMatrixData} options={{ responsive: true }} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">ROC Curve</h2>
                        <Line data={rocData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                    </div>
                </div>
                <Link to="/supervised" className="block mt-6 text-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Вернуться назад
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SupervisedResults;