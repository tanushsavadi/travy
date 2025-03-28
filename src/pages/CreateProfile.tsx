import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../context/UserProfileContext";
import InputField from "../components/InputField";
import CheckboxGroup from "../components/CheckboxGroup";
import Button from "../components/Button";

const ProfileSetup: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleDestinationChange = (index: number, value: string) => {
    const newDestinations = [...profile.destinations];
    newDestinations[index] = value;
    updateProfile({ destinations: newDestinations });
  };

  const addDestinationField = () => {
    updateProfile({ destinations: [...profile.destinations, ""] });
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!profile.fullName || profile.fullName.length < 3)
        newErrors.fullName = "Full Name must be at least 3 characters";
      if (!profile.university || profile.university.length < 3)
        newErrors.university = "Please enter your university";
    } else if (step === 2) {
      if (!profile.budget || isNaN(Number(profile.budget)) || Number(profile.budget) <= 0)
        newErrors.budget = "Please enter a valid budget amount";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const { email, password } = JSON.parse(storedProfile);
      if (email && password && (!profile.email || !profile.password)) {
        updateProfile({ email, password });
      }
    }
  });

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleProfileSetup = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    console.log("Profile Saved:", profile);
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Set Up Your Profile</h2>

        <form className="space-y-6" onSubmit={handleProfileSetup}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <InputField
                label="Full Name"
                type="text"
                value={profile.fullName}
                onChange={(e) => updateProfile({ fullName: e.target.value })}
                placeholder="John Doe"
                error={errors.fullName}
              />
              <InputField
                label="University"
                type="text"
                value={profile.university}
                onChange={(e) => updateProfile({ university: e.target.value })}
                placeholder="University Name"
                error={errors.university}
              />
            </>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <>
              <CheckboxGroup
                label="Preferred Transport Modes"
                options={["Bus", "Train", "Flight", "Carpool"]}
                selected={profile.transportModes}
                setSelected={(modes) => updateProfile({ transportModes: modes })}
              />

              <InputField
                label="Budget (in USD)"
                type="number"
                value={profile.budget}
                onChange={(e) => updateProfile({ budget: e.target.value })}
                placeholder="Enter your budget"
                error={errors.budget}
              />

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Frequent Travel Destinations
                </label>
                {profile.destinations.map((dest, idx) => (
                  <InputField
                    key={idx}
                    label=""
                    type="text"
                    value={dest}
                    onChange={(e) => handleDestinationChange(idx, e.target.value)}
                    placeholder="Enter destination"
                  />
                ))}
                <button
                  type="button"
                  onClick={addDestinationField}
                  className="text-white text-sm mt-2 underline"
                >
                  + Add Another Destination
                </button>
              </div>
            </>

          )}

          {/* Step 3: Rideshare Preferences */}
          {step === 3 && (
            <>
              <CheckboxGroup
                label="Rideshare Preferences"
                options={["Willing to drive", "Only want a ride", "Flexible"]}
                selected={profile.ridesharePreference}
                setSelected={(prefs) => updateProfile({ ridesharePreference: prefs })}
              />
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            {step > 1 && <Button text="Back" type="button" onClick={prevStep} />}
            {step < 4 ? (
              <Button text="Next" type="button" onClick={nextStep} />
            ) : (
              <Button text="Save & Continue" type="submit" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
