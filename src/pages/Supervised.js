import { useState, useEffect } from "react";
import Papa from "papaparse";
import { fetchCSV, fetchModelResults } from "../api/api";
import SupervisedResultsClassifier from "./SupervisedResultsClassifier";
import SupervisedResultsRegressor from "./SupervisedResultsRegressor";

function Supervised() {
    const [previewData, setPreviewData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [predictionType, setPredictionType] = useState(null);
    const [predictionData, setPredictionData] = useState(null);

    useEffect(() => {
        const loadPreview = async () => {
            setLoading(true);
            try {
                const csvString = await fetchCSV("preprocessed.csv");
                Papa.parse(csvString, {
                    header: true,
                    preview: 10, // берём только первые 10 строк
                    complete: ({ data }) => {
                        setPreviewData(data);
                        setError(null);
                        setLoading(false);
                    },
                });
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadPreview();
    }, []);

    const handlePredict = async (type) => {
        setPredictionType(type);
        setLoading(true);
        try {
            const resp = await fetchModelResults("supervised");
            setPredictionData(resp);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Supervised Learning</h2>

            {/* Кнопки для классификатора и регрессора */}
            <div className="mt-4 flex space-x-4">
                <button
                    onClick={() => handlePredict("classification")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading && predictionType === "classification" ? "Загрузка..." : "Classifier"}
                </button>
                <button
                    onClick={() => handlePredict("regression")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading && predictionType === "regression" ? "Загрузка..." : "Regressor"}
                </button>
            </div>

            {/* Результаты модели */}
            {predictionData && (
                <div className="mt-6">
                    {predictionType === "classification" ? (
                        <SupervisedResultsClassifier data={predictionData} />
                    ) : (
                        <SupervisedResultsRegressor data={predictionData} />
                    )}
                </div>
            )}

            {/* Превью первых 10 строк CSV */}
            {previewData.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Превью CSV (первые 10 строк)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border bg-white shadow-sm">
                            <thead>
                            <tr>
                                {Object.keys(previewData[0]).map((col, idx) => (
                                    <th key={idx} className="border p-2 bg-gray-100">{col}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {previewData.map((row, idx) => (
                                <tr key={idx}>
                                    {Object.values(row).map((cell, j) => (
                                        <td key={j} className="border p-2">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}



            {/* Ошибка */}
            {error && (
                <div className="mt-4 bg-red-500 text-white p-4 rounded-lg">
                    <p>{error}</p>
                </div>
            )}

            {/* Индикатор загрузки CSV */}
            {loading && !predictionType && (
                <div className="mt-4 text-center">Загрузка CSV...</div>
            )}
        </div>
    );
}

export default Supervised;
