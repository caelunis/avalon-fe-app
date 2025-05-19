import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function NNModelResults() {
    const result = window.result || "Кошка";
    const confidence = window.confidence || 0.95;
    const probabilities = window.probabilities || [
        { class: "Кошка", probability: 0.95 },
        { class: "Собака", probability: 0.05 },
    ];

    const barData = {
        labels: probabilities.map(item => item.class),
        datasets: [
            {
                label: "Вероятности",
                data: probabilities.map(item => item.probability),
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
                        <p className="text-lg">Результат: {result}</p>
                        <p className="text-lg">Confidence Score: {confidence}</p>
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

export default NNModelResults;