type DummyProfile = {
    fullName: string;
    email: string;
    password: string;
    university: string;
    transportModes: string[];
    budget: string;
    destinations: string[];
    ridesharePreference: string[];
  };
  
  const dummyUserProfiles: DummyProfile[] = [
    {
      fullName: "Jane Doe",
      email: "jane.doe@umass.edu",
      password: "JanePass123",
      university: "UMass Amherst",
      transportModes: ["Bus", "Train"],
      budget: "150",
      destinations: ["New York", "Boston"],
      ridesharePreference: ["Flexible"],
    },
    {
      fullName: "Alex Kim",
      email: "alex.kim@umass.edu",
      password: "AlexSecure456",
      university: "UMass Amherst",
      transportModes: ["Flight", "Carpool"],
      budget: "300",
      destinations: ["Los Angeles", "Chicago"],
      ridesharePreference: ["Only want a ride"],
    },
    {
      fullName: "Maria Gomez",
      email: "maria.gomez@umass.edu",
      password: "Maria789!",
      university: "UMass Boston",
      transportModes: ["Bus"],
      budget: "80",
      destinations: ["Providence", "Hartford"],
      ridesharePreference: ["Willing to drive"],
    },
    {
      fullName: "Liam Patel",
      email: "liam.patel@umass.edu",
      password: "LiamCool321",
      university: "UMass Lowell",
      transportModes: ["Train", "Carpool"],
      budget: "120",
      destinations: ["New Haven", "Philadelphia"],
      ridesharePreference: ["Flexible", "Willing to drive"],
    },
    {
      fullName: "Emily Zhang",
      email: "emily.zhang@umass.edu",
      password: "EmilyTravel987",
      university: "UMass Dartmouth",
      transportModes: ["Flight", "Bus"],
      budget: "200",
      destinations: ["Miami", "Seattle"],
      ridesharePreference: ["Only want a ride", "Flexible"],
    }
  ];
  
  export default dummyUserProfiles;
  