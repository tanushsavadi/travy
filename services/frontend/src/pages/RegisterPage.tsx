import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>(
    () => localStorage.getItem("register_email") || ""
  );
  const [password, setPassword] = useState<string>(
    () => localStorage.getItem("register_password") || ""
  );
  const [confirmPassword, setConfirmPassword] = useState<string>(
    () => localStorage.getItem("register_confirmPassword") || ""
  );
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    localStorage.setItem("register_email", email);
    localStorage.setItem("register_password", password);
    localStorage.setItem("register_confirmPassword", confirmPassword);
  }, [email, password, confirmPassword]);

  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@umass\.edu$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;
  const validateConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!validateEmail(email))
      newErrors.email = "Email must be a valid @umass.edu address";
    if (!validatePassword(password))
      newErrors.password = "Password must be at least 8 characters long";
    if (!validateConfirmPassword(password, confirmPassword))
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          university,
          budget,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ email: data.error || "Registration failed" });
        return;
      }

      localStorage.setItem("userProfile", JSON.stringify(data.user));

      localStorage.removeItem("register_email");
      localStorage.removeItem("register_password");
      localStorage.removeItem("register_confirmPassword");

      navigate("/profile-setup");
    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ email: "Server error" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-6" onSubmit={handleRegister}>
          <InputField
            label="Enter your UMass Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@umass.edu"
            error={errors.email}
          />

          <PasswordInput
            label="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            error={errors.password}
          />

          <PasswordInput
            label="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            error={errors.confirmPassword}
          />

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
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
