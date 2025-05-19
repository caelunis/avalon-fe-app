import { useState } from "react";
import FileUploader from "../components/FileUploader";
import { predictNNModel } from "../api/api";
import NNModelResults from "./NNModelResults";

function NNModel() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [predictionData, setPredictionData] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/png"].includes(file.type)) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError(null);
        } else {
            setError("Поддерживаются только .jpg и .png файлы.");
        }
    };

    const handlePredict = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const response = await predictNNModel(image);
            const imageUrl = URL.createObjectURL(image);
            const confidence = response.data?.confidence || "N/A";
            setPredictionData({
                imageUrl,
                result: `Confidence: ${confidence}`,
            });
            setError(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };


    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">NN Model</h2>
            <FileUploader
                accept=".jpg,.png"
                onFileChange={handleImageChange}
                label="Перетащите изображение (.jpg, .png) или"
            />
            {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Preview" className="max-w-full h-auto shadow-md rounded-lg" />
                    <button
                        onClick={handlePredict}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? "Загрузка..." : "Predict"}
                    </button>
                </div>
            )}
            {predictionData && (
                <div className="mt-6">
                    <NNModelResults {...predictionData} />
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

export default NNModel;