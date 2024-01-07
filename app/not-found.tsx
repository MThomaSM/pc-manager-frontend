
export default function NotFound() {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-800 pt-8 px-4 flex justify-center items-center h-[calc(100vh-322px)]">
            <div className="flex flex-col items-center justify-center space-y-2 py-12 md:pt-6 px-3 md:px-0 container">
                <div className={"bg-blue-400 text-white px-10 py-8 rounded-lg flex flex-col justify-center items-center"}>
                    <h1 className={"text-4xl font-bold"}>404</h1>
                    <p className={"text-lg font-medium"}>Page not found!</p>
                </div>
            </div>
        </div>
    )
}