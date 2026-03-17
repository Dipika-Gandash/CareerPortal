import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found</p>
      <p className="text-gray-500 mt-2">The page you are looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-black text-white px-6 py-2 rounded-lg"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;