import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { useState } from "react";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      email,
      password,
    };

    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="rounded-lg p-6 bg-white text-gray-800 shadow-xl max-w-md w-full">
        <div className="text-center flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-bold leading-none tracking-tight text-gray-800">Welcome Back</h3>
          <p className="text-gray-600 mt-2">Log in to access your Task Vault</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Addresss
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base   placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  className="flex mt-2  h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base   placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="w-full mt-6 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center p-6 pt-0">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
