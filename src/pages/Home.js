import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold mb-4">ML Predictor</h1>
            <p className="text-lg mb-6">Загружайте изображения или CSV-данные и получайте предсказания с помощью современных ML-моделей.</p>
            <div className="space-x-4">
                <Link to="/nn-model">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Попробовать NN Model</button>
                </Link>
                <Link to="/supervised">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Загрузить CSV-данные</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;