# Database Seed Script

This script populates the MongoDB database with dummy data for development and testing.

## What it creates:

- **5 dummy users** with realistic profiles
- **20 posts** (4 posts per user) with varied content
- **Engagement data** (likes/dislikes) between users
- **Realistic timestamps** spread over the last 7 days

## Usage:

```bash
# From the server directory
npm run seed
```

Or directly:
```bash
node scripts/seed.js
```

## Test Credentials:

All users use the password: `password123`

- sarah.chen@example.com
- marcus.j@example.com
- emily.r@example.com
- david.kim@example.com
- jessica.t@example.com

## Features:

- Automatically hashes passwords using bcrypt
- Clears existing data before seeding (can be commented out)
- Generates random engagement (likes/dislikes) between users
- Creates posts with timestamps spread over the last 7 days
- Uses placeholder images from Unsplash and Pravatar

## Note:

The script will **delete all existing users and posts** before seeding. Comment out the deletion lines if you want to keep existing data.

