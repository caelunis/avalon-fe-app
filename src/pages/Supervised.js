import { useState, useEffect } from "react";
import Papa from "papaparse";
import { fetchCSV, fetchModelResults } from "../api/api";
import SupervisedResultsClassifier from "./SupervisedResultsClassifier";
import SupervisedResultsRegressor from "./SupervisedResultsRegressor";

function Supervised() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [predictionType, setPredictionType] = useState(null);
    const [predictionData, setPredictionData] = useState(null);

    useEffect(() => {
        const loadCSV = async () => {
            setLoading(true);
            try {
                const csvData = await fetchCSV("preprocessed.csv");
                Papa.parse(csvData, {
                    complete: (result) => {
                        setData(result.data);
                        setError(null);
                    },
                    header: true,
                });
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        loadCSV();
    }, []);

    const handlePredict = async (type) => {
        setPredictionType(type);
        setLoading(true);
        try {
            const response = await fetchModelResults("supervised");
            setPredictionData(response);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Supervised Learning</h2>

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
            {predictionData && (
                <div className="mt-6">
                    {predictionType === "classification" ? (
                        <SupervisedResultsClassifier data={predictionData} />
                    ) : (
                        <SupervisedResultsRegressor data={predictionData} />
                    )}
                </div>
            )}
            {error && (
                <div className="mt-4 bg-red-500 text-white p-4 rounded-lg">
                    <p>{error}</p>
                </div>
            )}

            {loading && !predictionType && <div className="mt-4 text-center">Загрузка CSV...</div>}
            {data.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Превью CSV</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border bg-white text-black shadow-sm">
                            <thead>
                            <tr>
                                {Object.keys(data[0]).map((header, i) => (
                                    <th key={i} className="border p-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, i) => (
                                <tr key={i}>
                                    {Object.values(row).map((cell, j) => (
                                        <td key={j} className="border p-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Supervised;