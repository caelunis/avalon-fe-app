function FileUploader({ accept, onFileChange, label }) {
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        onFileChange({ target: { files: [file] } });
    };

    return (
        <div
            className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <p>{label}</p>
            <input type="file" accept={accept} onChange={onFileChange} className="mt-2" />
        </div>
    );
}

export default FileUploader;