import { useState, useEffect } from "react";
import axios from "axios";
import FileUploader from "../components/FileUploader";
import Papa from "papaparse";

function Supervised() {
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Обработка загрузки файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/csv") {
            const fileName = file.name; // Получаем имя файла
            setFileName(fileName);
            setError(null);
            // Парсинг локального файла для предпросмотра (опционально)
            Papa.parse(file, {
                complete: (result) => setData(result.data),
                header: true, // Если CSV имеет заголовки
            });
        } else {
            setError("Поддерживаются только .csv файлы.");
        }
    };

    // Получение данных с эндпоинта
    useEffect(() => {
        if (fileName) {
            setLoading(true);
            axios
                .get(`resources/${fileName}`, {
                    responseType: "text", // Указываем, что ожидаем текстовый CSV
                })
                .then((response) => {
                    Papa.parse(response.data, {
                        complete: (result) => {
                            setData(result.data);
                            setError(null);
                        },
                        header: true, // Предполагаем, что CSV имеет заголовки
                    });
                })
                .catch((err) => {
                    setError("Ошибка при загрузке данных с сервера.");
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
    }, [fileName]);

    const handlePredict = async () => {
        if (!fileName) return;
        setLoading(true);
        try {
            // Здесь должен быть запрос к эндпоинту для предсказания (замените на реальный)
            const response = {
                data: {
                    metrics: { accuracy: 0.95, precision: 0.93, recall: 0.94, f1: 0.94 },
                },
            };
            const resultWindow = window.open("/supervised-results", "_blank");
            resultWindow.metrics = response.data.metrics;
        } catch (err) {
            setError("Ошибка при обработке предсказания.");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Supervised Learning</h2>
            <FileUploader
                accept=".csv"
                onFileChange={handleFileChange}
                label="Загрузите CSV-датасет или укажите имя файла"
            />
            {loading && <div className="mt-4 text-center">Загрузка...</div>}
            {data.length > 0 && (
                <div className="mt-4">
                    <table className="w-full border-collapse border bg-white shadow-sm">
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

export default Supervised;