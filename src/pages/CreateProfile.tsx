import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import CheckboxGroup from "../components/CheckboxGroup";
import Button from "../components/Button";

const ProfileSetup: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [transportModes, setTransportModes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [frequentDestinations, setFrequentDestinations] = useState<string[]>([""]);
  const [ridesharePreference, setRidesharePreference] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleDestinationChange = (index: number, value: string) => {
    const newDestinations = [...frequentDestinations];
    newDestinations[index] = value;
    setFrequentDestinations(newDestinations);
  };

  const addDestinationField = () => {
    setFrequentDestinations([...frequentDestinations, ""]);
  };

  // **Validation for Each Step**
  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (fullName.length < 3) newErrors.fullName = "Full Name must be at least 3 characters";
      if (university.length < 3) newErrors.university = "Please enter your university";
    } else if (step === 2) {
      if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) newErrors.budget = "Please enter a valid budget amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // **Step Navigation**
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleProfileSetup = (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;

    console.log("Profile Saved:", { fullName, university, transportModes, budget, frequentDestinations, ridesharePreference });
    navigate("/dashboard");
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
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="John Doe"
                error={errors.fullName}
              />

              <InputField 
                label="University" 
                type="text" 
                value={university} 
                onChange={(e) => setUniversity(e.target.value)} 
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
                selected={transportModes} 
                setSelected={setTransportModes}
              />

              <InputField 
                label="Budget (in USD)" 
                type="number" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                placeholder="Enter your budget"
                error={errors.budget}
              />

              <div>
                <label className="block text-white text-sm font-medium mb-2">Frequent Travel Destinations</label>
                {frequentDestinations.map((destination, index) => (
                  <InputField 
                    key={index}
                    label="" 
                    type="text" 
                    value={destination} 
                    onChange={(e) => handleDestinationChange(index, e.target.value)} 
                    placeholder="Enter destination"
                  />
                ))}
                <button type="button" onClick={addDestinationField} className="text-white text-sm mt-2 underline">
                  + Add Another Destination
                </button>
              </div>
            </>
          )}

          {/* Step 3: Rideshare Settings */}
          {step === 3 && (
            <>
              <CheckboxGroup 
                label="Rideshare Preferences" 
                options={["Willing to drive", "Only want a ride", "Flexible"]}
                selected={ridesharePreference} 
                setSelected={setRidesharePreference}
              />
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
  {step > 1 && (
    <Button text="Back" type="button" onClick={prevStep} />
  )}

  {step < 3 ? (
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