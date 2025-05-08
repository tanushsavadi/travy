import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Button from "../components/Button";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateEmail = (email: string) => email.endsWith("@umass.edu");
  const validatePassword = (password: string) => password.length >= 8;
  const validateConfirmPassword = (pw: string, cpw: string) => pw === cpw;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: typeof errors = {};
    if (!validateEmail(email))
      newErrors.email = "Use a valid @umass.edu email.";
    if (!validatePassword(password))
      newErrors.password = "Password must be at least 8 characters.";
    if (!validateConfirmPassword(password, confirmPassword))
      newErrors.confirmPassword = "Passwords do not match.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Step 1: Supabase Auth Signup
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError || !signUpData.user) {
      console.error("❌ Supabase Auth signup failed:", signUpError?.message);
      setErrors({ email: "Registration failed." });
      return;
    }

    const userId = signUpData.user.id;
    console.log("✅ Auth signup success. User ID:", userId);

    // Step 2: Insert into users table
    const { error: insertError } = await supabase.from("users").insert({
      user_id: userId,
      email,
      name,
      university,
      budget: budget === "" ? null : budget,
    });

    if (insertError) {
      console.error("⚠️ Failed to insert profile:", insertError.message);
      setErrors({ email: "Could not save profile info." });
      return;
    }

    console.log("✅ Profile inserted into users table.");
    navigate("/profile-setup"); // or navigate("/home")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              UMass Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@umass.edu"
              className={`w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none transition ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-400 focus:border-white"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              className={`w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-400 focus:border-white"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className={`w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-400 focus:border-white"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Additional Profile Fields */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              University
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="UMass Amherst"
              className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Travel Budget ($)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="150"
              className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>

          <Button text="Register" type="submit" />
        </form>

        <p className="text-center text-white text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white font-semibold hover:underline transition"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
