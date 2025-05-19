import { useState } from "react";
import axios from "axios";
import FileUploader from "../components/FileUploader";

function Unsupervised() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/csv") {
            setFile(file);
            setData([["col1", "col2"], [1, 2], [3, 4]]);
            setError(null);
        } else {
            setError("Поддерживаются только .csv файлы.");
        }
    };

    const handlePredict = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const response = { data: { metrics: { silhouette: 0.85, dbi: 0.45 } } };
            const resultWindow = window.open("/unsupervised-results", "_blank");
            resultWindow.metrics = response.data.metrics;
        } catch (err) {
            setError("Ошибка при обработке данных.");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Unsupervised Learning</h2>
            <FileUploader
                accept=".csv"
                onFileChange={handleFileChange}
                label="Загрузите CSV-датасет"
            />
            {data.length > 0 && (
                <div className="mt-4">
                    <table className="w-full border-collapse border bg-white shadow-sm">
                        <thead>
                        <tr>{data[0].map((col, i) => <th key={i} className="border p-2">{col}</th>)}</tr>
                        </thead>
                        <tbody>
                        {data.slice(1).map((row, i) => (
                            <tr key={i}>{row.map((cell, j) => <td key={j} className="border p-2">{cell}</td>)}</tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handlePredict}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Загрузка..." : "Predict"}
                    </button>
                </div>
            )}
            {error && (
                <div className="mt-4 bg-red-500 text-white p-4 rounded-lg">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default Unsupervised;