import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Button from "../components/Button";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    console.log("🔐 Attempting login with:", email);

    // 1. Authenticate with Supabase Auth
    const { data: authData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !authData.user) {
      console.error("❌ Login failed:", loginError?.message);
      setErrorMessage(
        "Login failed: " + (loginError?.message || "Unknown error")
      );
      return;
    }

    console.log("✅ Login successful");
    console.log("👤 User:", authData.user);
    console.log("🔑 Access token:", authData.session?.access_token);

    const userId = authData.user.id;

    // 2. Fetch user's profile from `users` table
    const { data: profile, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single(); // expects exactly 1 row

    if (fetchError || !profile) {
      console.error("⚠️ Failed to fetch user profile:", fetchError?.message);
      setErrorMessage("Could not retrieve profile.");
      return;
    }

    console.log("📄 User profile:", profile);

    // 3. Optionally: store profile locally
    localStorage.setItem("userProfile", JSON.stringify(profile));

    // 4. Redirect to home
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@umass.edu"
              className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <Button text="Login" type="submit" />
        </form>

        <p className="text-center text-white text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-white font-semibold hover:underline transition"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
