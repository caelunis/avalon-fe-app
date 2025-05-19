import axios from "axios";

// Базовый URL для API
const API_BASE_URL = "http://localhost:8000";

// Получение CSV по имени файла
export const fetchCSV = async (fileName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/resources/${fileName}`, {
            responseType: "text",
        });
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при загрузке CSV: ${error.message}`);
    }
};

// Запрос на предсказание для NN Model (работа с изображением)
export const predictNNModel = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
            headers: { "Content-Type": "multipart/form-data"},
        });
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при предсказании NN Model: ${error.message}`);
    }
};

// Запрос на получение результатов модели (Supervised или Unsupervised)
export const fetchModelResults = async (model) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/results`, {
            params: { model },
        });
        if (!response.data.success) {
            throw new Error(response.data.message || "Ошибка при получении результатов");
        }
        return response.data.data;
    } catch (error) {
        throw new Error(`Ошибка при получении результатов модели ${model}: ${error.message}`);
    }
};