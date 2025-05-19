import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

function SupervisedResultsClassifier({ data }) {
    const classificationData = data?.classification || {};
    const chartRefs = useRef({});

    // Уничтожаем графики при размонтировании
    useEffect(() => {
        return () => {
            Object.values(chartRefs.current).forEach((chart) => {
                if (chart) {
                    chart.destroy();
                }
            });
        };
    }, []);

    // Функция для получения метрик модели
    const renderMetrics = (modelData, modelName) => {
        const metrics = [];
        for (const [key, value] of Object.entries(modelData)) {
            if (key !== "cv_results") {
                metrics.push(
                    <p key={`${modelName}-${key}`} className="text-white">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: {value.toFixed(4)}
                    </p>
                );
            }
        }
        if (modelData.cv_results) {
            for (const [key, value] of Object.entries(modelData.cv_results)) {
                if (!Array.isArray(value)) {
                    metrics.push(
                        <p key={`${modelName}-${key}`} className="text-white">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}: {value}
                        </p>
                    );
                }
            }
        }
        return metrics;
    };

    // Функция для построения графика accuracy_results
    const renderGraph = (modelData, modelName) => {
        if (!modelData.cv_results || !modelData.cv_results.accuracy_results) return null;

        const graphData = {
            labels: Array.from({ length: modelData.cv_results.accuracy_results.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: `Accuracy (Cross-Validation) - ${modelName}`,
                    data: modelData.cv_results.accuracy_results,
                    borderColor: "#3b82f6",
                    fill: false,
                    tension: 0.1,
                },
            ],
        };

        return (
            <div className="mt-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold mb-2">{modelName.toUpperCase()} - Accuracy (Cross-Validation)</h3>
                <Line
                    key={`${modelName}-accuracy-chart`} // Уникальный ключ для каждого графика
                    data={graphData}
                    options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                    ref={(el) => {
                        if (el) {
                            chartRefs.current[modelName] = el.chartInstance;
                        }
                    }}
                />
            </div>
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Результаты Classifier</h1>
            {Object.keys(classificationData).length === 0 ? (
                <p className="text-center text-red-500">Нет данных для классификации</p>
            ) : (
                Object.entries(classificationData).map(([modelName, modelData]) => (
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

export default SupervisedResultsClassifier;