import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white  p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="flex justify-center">
          <Link to="/">
            <button className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
