import { Calendar, Mail, User } from "lucide-react";
import Header from "../components/ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ChangePasswordForm from "../components/ui/ChangePasswordForm";
import { getUserProfile } from "../store/slices/authSlice";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">View and manage your account information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="p-6 border-1 border-gray-300 rounded-lg  bg-white ">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600">User Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{user.name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="p-6 border-1 border-gray-300 rounded-lg  bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600">Change Password</h3>
                </div>
                <div>
                  <ChangePasswordForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
