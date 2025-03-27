import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@umass\.edu$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!validateEmail(email)) newErrors.email = "Email must be a valid @umass.edu address";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters long";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Logging in with:", email, password);
    navigate("/profile-setup");
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
