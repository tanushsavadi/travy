import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Load data from localStorage if available
  const [email, setEmail] = useState<string>(() => localStorage.getItem("register_email") || "");
  const [password, setPassword] = useState<string>(() => localStorage.getItem("register_password") || "");
  const [confirmPassword, setConfirmPassword] = useState<string>(() => localStorage.getItem("register_confirmPassword") || "");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  useEffect(() => {
    // Save form data when inputs change
    localStorage.setItem("register_email", email);
    localStorage.setItem("register_password", password);
    localStorage.setItem("register_confirmPassword", confirmPassword);
  }, [email, password, confirmPassword]);

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@umass\.edu$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;
  const validateConfirmPassword = (password: string, confirmPassword: string) => password === confirmPassword;

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
  
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    if (!validateEmail(email)) newErrors.email = "Email must be a valid @umass.edu address";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters long";
    if (!validateConfirmPassword(password, confirmPassword)) newErrors.confirmPassword = "Passwords do not match";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    console.log("Registering with:", email, password);
  
    const existingProfile = localStorage.getItem("userProfile");
    const updatedProfile = {
      ...(existingProfile ? JSON.parse(existingProfile) : {}),
      email,
      password,
    };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  
    localStorage.removeItem("register_email");
    localStorage.removeItem("register_password");
    localStorage.removeItem("register_confirmPassword");
  
    navigate("/profile-setup");
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>

        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Email Input */}
          <InputField 
            label="Enter your UMass Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="example@umass.edu"
            error={errors.email}
          />

          {/* Password Input */}
          <PasswordInput 
            label="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********"
            error={errors.password}
          />

          {/* Confirm Password Input */}
          <PasswordInput 
            label="Confirm your password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="********"
            error={errors.confirmPassword}
          />

          <Button text="Register" type="submit" />
        </form>

        <p className="text-center text-white text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold hover:underline transition">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
