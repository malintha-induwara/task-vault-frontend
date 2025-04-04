import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { forgotPassword } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(false);

    if (!email) return;

    const resultAction = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(resultAction)) {
      setEmailSent(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="rounded-lg p-6 bg-white text-gray-800 shadow-xl max-w-md w-full">
        <div className="text-center flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-bold leading-none tracking-tight text-gray-800">Forgot Password</h3>
          <p className="text-gray-600 mt-2">Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>

              <button type="submit" className="w-full mt-6 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
          {emailSent && <p className="text-sm text-green-600 mt-4">If an account with that email exists, a password reset link has been sent.</p>}
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

          <div className="flex items-center justify-center mt-6">
            <p className="text-sm text-gray-600">
              Remember your password?
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

export default ForgotPassword;
