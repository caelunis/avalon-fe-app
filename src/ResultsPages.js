import { Link } from "react-router-dom";
import { Bar, Line, Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

// NN Model Results Page
export function NNModelResults({ result, confidence }) {
    const barData = {
        labels: ["Кошка", "Собака"],
        datasets: [
            {
                label: "Вероятности",
                data: [confidence || 0.95, 1 - (confidence || 0.95)],
                backgroundColor: ["#3b82f6", "#ef4444"],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Результаты NN Model</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Результат: {result || "Кошка"}</p>
                        <p className="text-lg">Confidence Score: {confidence || 0.95}</p>
                    </div>
                </div>
                <div className="max-w-md mx-auto">
                    <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                </div>
                <Link to="/nn-model" className="block mt-6 text-center">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Вернуться назад
                    </button>
                </Link>
            </div>
        </div>
    );
}

// Supervised Results Page
export function SupervisedResults({ metrics }) {
    const confusionMatrixData = {
        labels: ["Класс 1", "Класс 2"],
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
                        <p className="text-lg">Accuracy: {metrics?.accuracy || 0.95}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Precision: {metrics?.precision || 0.93}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Recall: {metrics?.recall || 0.94}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">F1-Score: {metrics?.f1 || 0.94}</p>
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

// Unsupervised Results Page
export function UnsupervisedResults({ metrics }) {
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
                        <p className="text-lg">Silhouette Score: {metrics?.silhouette || 0.85}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg">Davies-Bouldin Index: {metrics?.dbi || 0.45}</p>
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