export interface ListedPost {
  id: string;
  user: {
    avatar?: string; // URL or base64 image data
    name: string;
    university: string;
  };
  type: "offer" | "request";
  destination: string;
  requestCount: number;
  timestamp: Date;
  content: string;
}

export const mockPosts: ListedPost[] = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      university: "Boston University",
    },
    type: "offer",
    destination: "New York City, NY",
    requestCount: 5,
    timestamp: new Date("2025-02-01T19:56:00"),
    content:
      "Driving to NYC this Friday afternoon. Have 3 seats available. Willing to take passengers for $20 each. Can pick up from campus or nearby locations.",
  },
  {
    id: "2",
    user: {
      name: "Sam Wilson",
      university: "MIT",
    },
    type: "request",
    destination: "Boston, MA",
    requestCount: 12,
    timestamp: new Date("2025-01-30T08:30:00"),
    content:
      "Looking for a ride from Logan Airport to Cambridge area on Sunday evening. Have 2 large suitcases. Willing to pay $30 for the ride.",
  },
  {
    id: "3",
    user: {
      name: "Taylor Smith",
      university: "Harvard University",
    },
    type: "offer",
    destination: "Providence, RI",
    requestCount: 3,
    timestamp: new Date("2025-02-02T15:20:00"),
    content:
      "Going to Providence on Saturday morning. Can take 2 people. Flexible on pickup locations around campus. $15 per seat.",
  },
  {
    id: "4",
    user: {
      name: "Jordan Lee",
      university: "Northeastern University",
    },
    type: "request",
    destination: "Chicago, IL",
    requestCount: 8,
    timestamp: new Date("2025-01-29T11:45:00"),
    content:
      "Need a ride to Chicago for spring break. Looking to leave around March 10th. Will share driving and gas costs. Have 1 medium suitcase.",
  },
];
