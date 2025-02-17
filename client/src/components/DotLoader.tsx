
const DotLoader = () => {
    return (
        <div className="flex items-center justify-center">
            <div
                className="w-5 h-5 bg-black rounded-full mx-1 animate-dotFlashing"
                style={{ animationDelay: "0s" }}
            ></div>
            <div
                className="w-5 h-5 bg-black rounded-full mx-1 animate-dotFlashing"
                style={{ animationDelay: "0.2s" }}
            ></div>
            <div
                className="w-5 h-5 bg-black rounded-full mx-1 animate-dotFlashing"
                style={{ animationDelay: "0.4s" }}
            ></div>
        </div>
    );
};

export default DotLoader;
