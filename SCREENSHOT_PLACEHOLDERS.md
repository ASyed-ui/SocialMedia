# Screenshot Placeholders Guide

## Where to Take Screenshots

### 1. Feed Page (Slide 12)
**Location:** `/` (homepage when logged in)
**What to capture:**
- Navigation bar
- Multiple posts visible
- Like/dislike buttons
- Create Post button
- User avatars and names

**Tips:** Make sure you have at least 2-3 posts visible

---

### 2. Profile Page (Slide 13)
**Location:** `/profile/[userId]`
**What to capture:**
- User profile picture
- User name and email
- Bio section
- "My Posts" or "[Name]'s Posts" section
- At least one post visible

**Tips:** Use one of the demo users (e.g., Sarah Chen)

---

### 3. Search Page (Slide 14)
**Location:** `/search`
**What to capture:**
- Search input box
- Tabs (All/Users/Posts)
- Search results (both users and posts)
- User cards
- Post cards

**Tips:** Search for something like "Sarah" or "code" to show results

---

### 4. Create Post Page (Slide 15)
**Location:** `/create`
**What to capture:**
- Form with content textarea
- Image URL input
- Create button
- Form layout

**Tips:** Show the form before submitting

---

### 5. Mobile View (Slide 16)
**Location:** Any page, but resize browser to mobile width
**What to capture:**
- Hamburger menu icon
- Mobile navigation menu open
- Responsive layout
- Touch-friendly buttons

**Tips:** Use browser dev tools to simulate mobile (375px width)

---

## How to Take Good Screenshots

1. **Use browser dev tools:**
   - Chrome: F12 → Toggle device toolbar
   - Set to 1920x1080 for desktop
   - Set to 375x667 for mobile

2. **Clean state:**
   - Clear browser console
   - Hide browser extensions
   - Use incognito mode if needed

3. **Composition:**
   - Center the important content
   - Show enough context
   - Avoid cluttered views

4. **File naming:**
   - `feed-page.png`
   - `profile-page.png`
   - `search-page.png`
   - `create-post-page.png`
   - `mobile-view.png`

5. **Tools:**
   - Browser screenshot (Chrome DevTools)
   - Snipping Tool (Windows)
   - Screenshot (Mac: Cmd+Shift+4)
   - Online tools like Screenshot.guru

---

## Quick Screenshot Script

You can also use this to automate screenshots:

```bash
# Install screenshot tool (optional)
npm install -g pageres-cli

# Take screenshots
pageres http://localhost:5173 1920x1080 --filename=feed-page
pageres http://localhost:5173/search 1920x1080 --filename=search-page
pageres http://localhost:5173/profile/[userId] 1920x1080 --filename=profile-page
```

