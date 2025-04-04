import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/UserProfileContext";
import dummyUserProfiles from "../data/dummyUserProfile";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { updateProfile } = useUserProfile();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      navigate("/home");
    }
  }
  , [navigate]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    const storedData = localStorage.getItem("userProfile");
    const savedUser = storedData ? JSON.parse(storedData) : null;
    const matchesLocalUser = savedUser?.email === email && savedUser?.password === password;

    const matchedDummyUser = dummyUserProfiles.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchesLocalUser && !matchedDummyUser) {
      newErrors.email = "Invalid email or password";
      setErrors(newErrors);
      return;
    }

    login(email);

    const finalProfile = matchedDummyUser || savedUser;
    if (finalProfile) {
      localStorage.setItem("userProfile", JSON.stringify(finalProfile));
      updateProfile(finalProfile);
    }

    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Enter your UMass Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@umass.edu"
              className={`w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none transition ${
                errors.email ? "border-red-500" : "border-gray-400 focus:border-white"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Enter your password</label>
            <div className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white flex items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <p className="text-left text-white text-sm mt-6">
            Forgot your password?{" "}
            <a href="/forgot-password" className="text-white font-semibold hover:underline transition">
              Reset it here
            </a>
          </p>

          <Button text="Login" type="submit" />
        </form>

        <p className="text-center text-white text-sm mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-white font-semibold hover:underline transition">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
