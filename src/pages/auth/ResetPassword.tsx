import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { resetPassword } from "../../store/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams<{ token: string }>();

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (!token) {
      console.error("Token is missing");
      return;
    }

    await dispatch(resetPassword({ token, password }));
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="rounded-lg p-6 bg-white text-gray-800 shadow-xl max-w-md w-full">
        <div className="text-center flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-bold leading-none tracking-tight text-gray-800">Reset Password</h3>
          <p className="text-gray-600 mt-2">Enter a new password for your account</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={`flex mt-2 h-10 w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } bg-white px-3 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className={`flex mt-2 h-10 w-full rounded-md border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } bg-white px-3 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                />
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={isLoading} className="w-full mt-6 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center mt-6">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
