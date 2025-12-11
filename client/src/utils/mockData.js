// mockData.js - Frontend mock data for development/testing
// Use this for frontend development when backend is not available

export const mockUsers = [
  {
    _id: "user1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    profilePic: "https://i.pravatar.cc/150?img=1",
    bio: "Software engineer passionate about web development and open source. Coffee enthusiast ☕",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "user2",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    profilePic: "https://i.pravatar.cc/150?img=12",
    bio: "Photographer | Traveler | Storyteller. Capturing moments one frame at a time 📸",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "user3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    profilePic: "https://i.pravatar.cc/150?img=5",
    bio: "UX Designer | Dog mom 🐕 | Always learning something new. Let's build beautiful experiences together!",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "user4",
    name: "David Kim",
    email: "david.kim@example.com",
    profilePic: "https://i.pravatar.cc/150?img=33",
    bio: "Data scientist | Machine learning enthusiast | Chess player ♟️ | Always curious about the world",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "user5",
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    profilePic: "https://i.pravatar.cc/150?img=47",
    bio: "Content creator | Fitness enthusiast 💪 | Sharing my journey and tips for a healthy lifestyle",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper to generate random timestamp within last 7 days
const getRandomTimestamp = (daysAgo) => {
  const now = Date.now();
  const daysAgoMs = daysAgo * 24 * 60 * 60 * 1000;
  const randomMs = Math.random() * daysAgoMs;
  return new Date(now - randomMs).toISOString();
};

// Generate mock posts with engagement data
export const mockPosts = [
  // Sarah's posts (user1)
  {
    _id: "post1",
    userId: {
      _id: "user1",
      name: "Sarah Chen"
    },
    content: "Just shipped a new feature! 🚀 The feeling of seeing your code in production never gets old. What's everyone working on this week?",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    likes: [
      { _id: "user2", name: "Marcus Johnson" },
      { _id: "user3", name: "Emily Rodriguez" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(6),
    updatedAt: getRandomTimestamp(6)
  },
  {
    _id: "post2",
    userId: {
      _id: "user1",
      name: "Sarah Chen"
    },
    content: "Coffee and code - the perfect morning combo ☕ Anyone else find that their best ideas come during those early morning coding sessions?",
    image: "",
    likes: [
      { _id: "user4", name: "David Kim" },
      { _id: "user5", name: "Jessica Taylor" },
      { _id: "user2", name: "Marcus Johnson" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(4),
    updatedAt: getRandomTimestamp(4)
  },
  {
    _id: "post3",
    userId: {
      _id: "user1",
      name: "Sarah Chen"
    },
    content: "Open source contribution of the day: Fixed a bug in a library I use daily. Giving back to the community feels amazing! What open source projects are you contributing to?",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    likes: [
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(2),
    updatedAt: getRandomTimestamp(2)
  },
  {
    _id: "post4",
    userId: {
      _id: "user1",
      name: "Sarah Chen"
    },
    content: "Debugging tip: When you've been stuck on a bug for hours, explain it to a rubber duck (or a colleague). Works every time! 🦆",
    image: "",
    likes: [
      { _id: "user2", name: "Marcus Johnson" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(1),
    updatedAt: getRandomTimestamp(1)
  },
  
  // Marcus's posts (user2)
  {
    _id: "post5",
    userId: {
      _id: "user2",
      name: "Marcus Johnson"
    },
    content: "Golden hour in the mountains 🌄 Sometimes the best photos happen when you least expect them. This one was taken during a spontaneous hike!",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(5),
    updatedAt: getRandomTimestamp(5)
  },
  {
    _id: "post6",
    userId: {
      _id: "user2",
      name: "Marcus Johnson"
    },
    content: "Question for fellow photographers: What's your go-to lens for street photography? I'm looking to expand my collection.",
    image: "",
    likes: [
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(3),
    updatedAt: getRandomTimestamp(3)
  },
  {
    _id: "post7",
    userId: {
      _id: "user2",
      name: "Marcus Johnson"
    },
    content: "Just finished editing a series from my recent trip to Iceland. The landscapes there are absolutely breathtaking! 📸",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user4", name: "David Kim" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(2),
    updatedAt: getRandomTimestamp(2)
  },
  {
    _id: "post8",
    userId: {
      _id: "user2",
      name: "Marcus Johnson"
    },
    content: "Photography isn't just about capturing what you see, it's about capturing what you feel. That's what makes it art.",
    image: "",
    likes: [
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(0.5),
    updatedAt: getRandomTimestamp(0.5)
  },
  
  // Emily's posts (user3)
  {
    _id: "post9",
    userId: {
      _id: "user3",
      name: "Emily Rodriguez"
    },
    content: "New design system launched! 🎨 After months of work, our team finally released a comprehensive design system. So proud of what we've built together!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user2", name: "Marcus Johnson" },
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(6),
    updatedAt: getRandomTimestamp(6)
  },
  {
    _id: "post10",
    userId: {
      _id: "user3",
      name: "Emily Rodriguez"
    },
    content: "My dog just learned a new trick! 🐕 He can now high-five on command. Who else has pets that make their day better?",
    image: "",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(4),
    updatedAt: getRandomTimestamp(4)
  },
  {
    _id: "post11",
    userId: {
      _id: "user3",
      name: "Emily Rodriguez"
    },
    content: "User research insights: Sometimes the best solutions come from understanding the problem deeply. Spent the day talking to users and learned so much!",
    image: "",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(2),
    updatedAt: getRandomTimestamp(2)
  },
  {
    _id: "post12",
    userId: {
      _id: "user3",
      name: "Emily Rodriguez"
    },
    content: "Design tip: White space is not empty space - it's a powerful design element. Less is often more! ✨",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
    likes: [
      { _id: "user2", name: "Marcus Johnson" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(1),
    updatedAt: getRandomTimestamp(1)
  },
  
  // David's posts (user4)
  {
    _id: "post13",
    userId: {
      _id: "user4",
      name: "David Kim"
    },
    content: "Just finished training a new ML model for predicting stock trends. The results are promising! 📊 Anyone else working on financial ML projects?",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user3", name: "Emily Rodriguez" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(5),
    updatedAt: getRandomTimestamp(5)
  },
  {
    _id: "post14",
    userId: {
      _id: "user4",
      name: "David Kim"
    },
    content: "Chess tournament this weekend! ♟️ Been practicing daily. Wish me luck! What strategies do you use when playing chess?",
    image: "",
    likes: [
      { _id: "user2", name: "Marcus Johnson" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(3),
    updatedAt: getRandomTimestamp(3)
  },
  {
    _id: "post15",
    userId: {
      _id: "user4",
      name: "David Kim"
    },
    content: "Data visualization can be beautiful and informative. Just created a dashboard that tells a compelling story with data. 📈",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user5", name: "Jessica Taylor" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(1),
    updatedAt: getRandomTimestamp(1)
  },
  {
    _id: "post16",
    userId: {
      _id: "user4",
      name: "David Kim"
    },
    content: "The more I learn about machine learning, the more I realize how much there is to learn. The journey never ends, and that's exciting!",
    image: "",
    likes: [
      { _id: "user2", name: "Marcus Johnson" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(0.5),
    updatedAt: getRandomTimestamp(0.5)
  },
  
  // Jessica's posts (user5)
  {
    _id: "post17",
    userId: {
      _id: "user5",
      name: "Jessica Taylor"
    },
    content: "Morning workout complete! 💪 Started the day with a 5K run. There's something about morning exercise that sets the tone for the whole day.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(6),
    updatedAt: getRandomTimestamp(6)
  },
  {
    _id: "post18",
    userId: {
      _id: "user5",
      name: "Jessica Taylor"
    },
    content: "New healthy recipe I tried today: Quinoa bowl with roasted vegetables. So delicious and nutritious! 🌱 What's your favorite healthy meal?",
    image: "",
    likes: [
      { _id: "user2", name: "Marcus Johnson" },
      { _id: "user3", name: "Emily Rodriguez" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(4),
    updatedAt: getRandomTimestamp(4)
  },
  {
    _id: "post19",
    userId: {
      _id: "user5",
      name: "Jessica Taylor"
    },
    content: "Fitness journey update: Hit a new personal record today! Consistency really is key. Small progress every day adds up to big results.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    likes: [
      { _id: "user1", name: "Sarah Chen" },
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(2),
    updatedAt: getRandomTimestamp(2)
  },
  {
    _id: "post20",
    userId: {
      _id: "user5",
      name: "Jessica Taylor"
    },
    content: "Self-care Sunday ✨ Taking time to recharge is so important. What does your self-care routine look like?",
    image: "",
    likes: [
      { _id: "user2", name: "Marcus Johnson" },
      { _id: "user3", name: "Emily Rodriguez" },
      { _id: "user4", name: "David Kim" }
    ],
    dislikes: [],
    createdAt: getRandomTimestamp(0.5),
    updatedAt: getRandomTimestamp(0.5)
  }
];

// Sort posts by createdAt (newest first)
export const getMockPosts = () => {
  return [...mockPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Get mock user by ID
export const getMockUser = (userId) => {
  return mockUsers.find(user => user._id === userId);
};

// Get all mock users
export const getMockUsers = () => {
  return mockUsers;
};





