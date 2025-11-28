// seed.js - Seed script for dummy data
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://comp229_useradmin:7qPyLAPFtLEQBoy2@connectsphere.tqqdn3s.mongodb.net/?appName=ConnectSphere";

// Dummy users data
const dummyUsers = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    password: "password123",
    profilePic: "https://i.pravatar.cc/150?img=1",
    bio: "Software engineer passionate about web development and open source. Coffee enthusiast ☕"
  },
  {
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    password: "password123",
    profilePic: "https://i.pravatar.cc/150?img=12",
    bio: "Photographer | Traveler | Storyteller. Capturing moments one frame at a time 📸"
  },
  {
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    password: "password123",
    profilePic: "https://i.pravatar.cc/150?img=5",
    bio: "UX Designer | Dog mom 🐕 | Always learning something new. Let's build beautiful experiences together!"
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    password: "password123",
    profilePic: "https://i.pravatar.cc/150?img=33",
    bio: "Data scientist | Machine learning enthusiast | Chess player ♟️ | Always curious about the world"
  },
  {
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    password: "password123",
    profilePic: "https://i.pravatar.cc/150?img=47",
    bio: "Content creator | Fitness enthusiast 💪 | Sharing my journey and tips for a healthy lifestyle"
  }
];

// Dummy posts data - will be assigned to users
const dummyPosts = [
  // Sarah's posts
  {
    content: "Just shipped a new feature! 🚀 The feeling of seeing your code in production never gets old. What's everyone working on this week?",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    likes: [], // Will be populated
    dislikes: []
  },
  {
    content: "Coffee and code - the perfect morning combo ☕ Anyone else find that their best ideas come during those early morning coding sessions?",
    image: "",
    likes: [],
    dislikes: []
  },
  {
    content: "Open source contribution of the day: Fixed a bug in a library I use daily. Giving back to the community feels amazing! What open source projects are you contributing to?",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "Debugging tip: When you've been stuck on a bug for hours, explain it to a rubber duck (or a colleague). Works every time! 🦆",
    image: "",
    likes: [],
    dislikes: []
  },
  
  // Marcus's posts
  {
    content: "Golden hour in the mountains 🌄 Sometimes the best photos happen when you least expect them. This one was taken during a spontaneous hike!",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "Question for fellow photographers: What's your go-to lens for street photography? I'm looking to expand my collection.",
    image: "",
    likes: [],
    dislikes: []
  },
  {
    content: "Just finished editing a series from my recent trip to Iceland. The landscapes there are absolutely breathtaking! 📸",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "Photography isn't just about capturing what you see, it's about capturing what you feel. That's what makes it art.",
    image: "",
    likes: [],
    dislikes: []
  },
  
  // Emily's posts
  {
    content: "New design system launched! 🎨 After months of work, our team finally released a comprehensive design system. So proud of what we've built together!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "My dog just learned a new trick! 🐕 He can now high-five on command. Who else has pets that make their day better?",
    image: "",
    likes: [],
    dislikes: []
  },
  {
    content: "User research insights: Sometimes the best solutions come from understanding the problem deeply. Spent the day talking to users and learned so much!",
    image: "",
    likes: [],
    dislikes: []
  },
  {
    content: "Design tip: White space is not empty space - it's a powerful design element. Less is often more! ✨",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
    likes: [],
    dislikes: []
  },
  
  // David's posts
  {
    content: "Just finished training a new ML model for predicting stock trends. The results are promising! 📊 Anyone else working on financial ML projects?",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "Chess tournament this weekend! ♟️ Been practicing daily. Wish me luck! What strategies do you use when playing chess?",
    image: "",
    likes: [],
    dislikes: []
  },
  {
    content: "Data visualization can be beautiful and informative. Just created a dashboard that tells a compelling story with data. 📈",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "The more I learn about machine learning, the more I realize how much there is to learn. The journey never ends, and that's exciting!",
    image: "",
    likes: [],
    dislikes: []
  },
  
  // Jessica's posts
  {
    content: "Morning workout complete! 💪 Started the day with a 5K run. There's something about morning exercise that sets the tone for the whole day.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "New healthy recipe I tried today: Quinoa bowl with roasted vegetables. So delicious and nutritious! 🌱 What's your favorite healthy meal?",
    image: "",
    likes: [],
    dislikes: []
  },
  {
    content: "Fitness journey update: Hit a new personal record today! Consistency really is key. Small progress every day adds up to big results.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    likes: [],
    dislikes: []
  },
  {
    content: "Self-care Sunday ✨ Taking time to recharge is so important. What does your self-care routine look like?",
    image: "",
    likes: [],
    dislikes: []
  }
];

// Generate timestamps spread over last 7 days
function getRandomTimestamp(daysAgo) {
  const now = new Date();
  const daysAgoMs = daysAgo * 24 * 60 * 60 * 1000;
  const randomMs = Math.random() * daysAgoMs;
  return new Date(now.getTime() - randomMs);
}

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");
    
    // Connect to database
    await connectDB(MONGO_URI);
    console.log("✅ Connected to database");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🗑️  Clearing existing data...");
    await Post.deleteMany({});
    await User.deleteMany({});
    console.log("✅ Cleared existing data");

    // Create users with hashed passwords
    console.log("👥 Creating users...");
    const createdUsers = [];
    for (const userData of dummyUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.name}`);
    }
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create posts with realistic timestamps and engagement
    console.log("📝 Creating posts...");
    const postsPerUser = 4;
    let postIndex = 0;
    
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      
      for (let j = 0; j < postsPerUser; j++) {
        if (postIndex >= dummyPosts.length) break;
        
        const postData = dummyPosts[postIndex];
        
        // Generate random likes/dislikes from other users
        const likes = [];
        const dislikes = [];
        
        // Randomly assign likes (0-3 other users)
        const numLikes = Math.floor(Math.random() * 4);
        const availableUsers = createdUsers.filter(u => u._id.toString() !== user._id.toString());
        const shuffled = [...availableUsers].sort(() => 0.5 - Math.random());
        
        for (let k = 0; k < Math.min(numLikes, shuffled.length); k++) {
          likes.push(shuffled[k]._id);
        }
        
        // Occasionally add a dislike (10% chance)
        if (Math.random() < 0.1 && shuffled.length > 0) {
          const dislikeUser = shuffled.find(u => !likes.includes(u._id));
          if (dislikeUser) {
            dislikes.push(dislikeUser._id);
          }
        }
        
        // Create post with timestamp spread over last 7 days
        const daysAgo = Math.floor(Math.random() * 7);
        const createdAt = getRandomTimestamp(daysAgo);
        
        const post = new Post({
          userId: user._id,
          content: postData.content,
          image: postData.image,
          likes: likes,
          dislikes: dislikes,
          createdAt: createdAt,
          updatedAt: createdAt
        });
        
        await post.save();
        console.log(`   ✓ Created post by ${user.name} (${likes.length} likes)`);
        postIndex++;
      }
    }
    
    console.log(`✅ Created ${postIndex} posts`);

    console.log("\n🎉 Database seeded successfully!");
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Posts: ${postIndex}`);
    console.log("\n📧 Test credentials (all use password: password123):");
    createdUsers.forEach(user => {
      console.log(`   ${user.email}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();

