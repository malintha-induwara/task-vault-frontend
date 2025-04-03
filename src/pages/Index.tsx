import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-10 flex flex-col min-h-screen justify-between">
        <div>
          <header className="flex justify-between items-center mb-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Task Vault</h1>
            </div>
            <div className="space-x-4">
              <button onClick={() => navigate("/login")} className="px-6 py-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-100 transition-colors duration-200 cursor-pointer ">
                Login
              </button>
              <button onClick={() => navigate("/register")} className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                Sign Up
              </button>
            </div>
          </header>

          <main>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-12">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                  Organize your tasks with <span className="text-blue-600">Task Vault</span>
                </h2>
                <p className="text-lg">A simple, intuitive, and beautifully designed to-do app that helps you stay organized and productive.</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-300/20 p-1 rounded-full">
                      <Check size={16} className="text-blue-600" />
                    </div>
                    <p>Create and manage tasks effortlessly</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-300/20 p-1 rounded-full">
                      <Check size={16} className="text-blue-600" />
                    </div>
                    <p>Sort tasks by date and name</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-300/20 p-1 rounded-full">
                      <Check size={16} className="text-blue-600" />
                    </div>
                    <p>Highlights today's tasks for better focus</p>
                  </div>
                </div>
                <div className="space-x-4 pt-4 flex">
                  <button onClick={() => navigate("/register")} className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer">
                    Get Started <ArrowRight size={16} className="ml-2 inline" />
                  </button>
                  <button onClick={() => navigate("/login")} className="px-6 py-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    Log In
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 bg-white rounded-lg shadow-xl p-6">
                <div className="rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-medium mb-2">Task Dashboard Preview</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border border-blue-500"></div>
                        <span>Complete project proposal</span>
                      </div>
                      <span className="text-xs text-gray-600">Today</span>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                        <span className="line-through text-gray-500">Review documentation</span>
                      </div>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border border-blue-600"></div>
                        <span>Schedule team meeting</span>
                      </div>
                      <span className="text-xs text-gray-500 ">Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <footer className="py-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Task Vault. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
