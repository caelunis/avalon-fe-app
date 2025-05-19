import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, Legend);

function SupervisedResultsRegressor({ data }) {
    const regressionData = data?.regression || {};

    // Функция для получения метрик модели
    const renderMetrics = (modelData, modelName) => {
        const metrics = [];
        for (const [key, value] of Object.entries(modelData)) {
            if (key !== "cv_results") {
                metrics.push(
                    <p key={`${modelName}-${key}`} className="text-lg">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: {value.toFixed(4)}
                    </p>
                );
            }
        }
        if (modelData.cv_results) {
            for (const [key, value] of Object.entries(modelData.cv_results)) {
                if (!Array.isArray(value)) {
                    metrics.push(
                        <p key={`${modelName}-${key}`} className="text-lg">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: {value}
                        </p>
                    );
                }
            }
        }
        return metrics;
    };

    // Функция для построения графика (d2mae_results или mae_results)
    const renderGraph = (modelData, modelName) => {
        const resultsKey = modelData.cv_results?.d2mae_results ? "d2mae_results" : "mae_results";
        if (!modelData.cv_results || !modelData.cv_results[resultsKey]) return null;

        const graphData = {
            labels: Array.from({ length: modelData.cv_results[resultsKey].length }, (_, i) => i + 1),
            datasets: [
                {
                    label: `${resultsKey.replace('_results', '').toUpperCase()} (Cross-Validation) - ${modelName}`,
                    data: modelData.cv_results[resultsKey],
                    borderColor: "#ef4444",
                    fill: false,
                    tension: 0.1,
                },
            ],
        };

        return (
            <div className="mt-4 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-2">{modelName.toUpperCase()} - {resultsKey.replace('_results', '').toUpperCase()} (Cross-Validation)</h3>
                <Line data={graphData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </div>
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Результаты Regressor</h1>
            {Object.keys(regressionData).length === 0 ? (
                <p className="text-center text-red-500">Нет данных для регрессии</p>
            ) : (
                Object.entries(regressionData).map(([modelName, modelData]) => (
                    <div key={modelName} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{modelName.toUpperCase()}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
                                {renderMetrics(modelData, modelName)}
                            </div>
                        </div>
                        {renderGraph(modelData, modelName)}
                    </div>
                ))
            )}
        </div>
    );
}

export default SupervisedResultsRegressor;