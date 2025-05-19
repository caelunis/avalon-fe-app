function NNModelResults({ imageUrl, result }) {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Результаты NN Model</h1>
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md text-center">
                    <p className="text-lg">{result || "Result: Smiling"}</p>
                </div>
                <div className="max-w-md mx-auto">
                    <img src={imageUrl} alt="Prediction Result" className="max-w-full h-auto shadow-md rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default NNModelResults;