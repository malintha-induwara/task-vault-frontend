import { useState, useEffect } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { changePassword, clearError } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const ChangePasswordForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [success, setSuccess] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState<string | undefined>(undefined);
  const [newPasswordError, setNewPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!oldPassword) {
      setOldPasswordError("Current password is required");
      isValid = false;
    } else {
      setOldPasswordError(undefined);
    }

    if (!newPassword) {
      setNewPasswordError("New password is required");
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setNewPasswordError(undefined);
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords must match");
      isValid = false;
    } else {
      setConfirmPasswordError(undefined);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const resultAction = await dispatch(
      changePassword({
        oldPassword,
        newPassword,
      })
    );

    if (changePassword.fulfilled.match(resultAction)) {
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    // Clear any existing errors when component mounts or unmounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      {error && <div className="p-3 bg-red-100 text-red-600 rounded-md">{error}</div>}
      {success && <div className="p-3 bg-green-100 text-green-600 rounded-md">Password changed successfully!</div>}

      <div className="space-y-1 w-full">
        <label htmlFor="oldPassword" className="block text-sm font-medium">
          Current Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-500" />
          </div>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="••••••••"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border ${oldPasswordError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {oldPasswordError && <p className="text-sm text-red-600">{oldPasswordError}</p>}
      </div>

      <div className="space-y-1 w-full">
        <label htmlFor="newPassword" className="block text-sm font-medium">
          New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-500" />
          </div>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border ${newPasswordError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {newPasswordError && <p className="text-sm text-red-600">{newPasswordError}</p>}
      </div>

      <div className="space-y-1 w-full">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-500" />
          </div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border ${confirmPasswordError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {confirmPasswordError && <p className="text-sm text-red-600">{confirmPasswordError}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        Change Password
        <ArrowRight size={18} className="ml-2" />
      </button>
    </form>
  );
};

export default ChangePasswordForm;
