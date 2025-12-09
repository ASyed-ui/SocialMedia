# Visual Diagrams for Presentation

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                    (React Frontend)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │   Feed     │  │  Profile   │  │   Search   │                │
│  │   Page     │  │   Page     │  │   Page     │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  Create    │  │   Login    │  │  Register  │                │
│  │   Post     │  │   Page     │  │   Page     │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Navigation Component                        │   │
│  │  (Desktop Menu | Mobile Menu | User Dropdown)           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │ (Axios)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                              │
│                   (Node.js / Express)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Middleware Layer                      │   │
│  │  • CORS • Authentication • Error Handling               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Auth Routes  │  │ Post Routes  │  │Search Routes │          │
│  │              │  │              │  │              │          │
│  │ • Register   │  │ • Create     │  │ • Users      │          │
│  │ • Login      │  │ • Read       │  │ • Posts      │          │
│  │ • Logout     │  │ • Update     │  │ • All        │          │
│  │ • Profile    │  │ • Delete     │  │              │          │
│  │              │  │ • Like/Dislike│ │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Controllers                           │   │
│  │  • auth.controller.js • post.controller.js              │   │
│  │  • search.controller.js                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│                    (MongoDB Atlas)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │      USERS           │      │       POSTS          │        │
│  ├──────────────────────┤      ├──────────────────────┤        │
│  │ _id                  │      │ _id                  │        │
│  │ name                 │      │ userId (ref)         │◄───────┼──┐
│  │ email                │      │ content              │        │  │
│  │ password (hashed)    │      │ image                │        │  │
│  │ profilePic           │      │ likes[] (ref)        │◄───────┼──┼──┐
│  │ bio                  │      │ dislikes[] (ref)     │◄───────┼──┼──┼──┐
│  │ createdAt            │      │ createdAt            │        │  │  │  │
│  │ updatedAt            │      │ updatedAt            │        │  │  │  │
│  └──────────────────────┘      └──────────────────────┘        │  │  │  │
│                                                                   │  │  │  │
│  Relationships:                                                  │  │  │  │
│  • One User → Many Posts                                         │  │  │  │
│  • Many Users → Many Posts (likes)                               │  │  │  │
│  • Many Users → Many Posts (dislikes)                            │  │  │  │
│                                                                   └──┴──┴──┘
└─────────────────────────────────────────────────────────────────┘
```

---

## User Flow Diagram

```
                    START
                      │
                      ▼
            ┌─────────────────┐
            │   Landing Page   │
            │      (Feed)      │
            └─────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
    ┌─────▼─────┐         ┌──────▼──────┐
    │  Logged   │         │  Not Logged │
    │    In     │         │             │
    └─────┬─────┘         └──────┬───────┘
          │                      │
          │                      ▼
          │              ┌──────────────┐
          │              │ Login/       │
          │              │ Register     │
          │              └──────┬───────┘
          │                     │
          │                     ▼
          │              ┌──────────────┐
          │              │ Authenticate │
          │              └──────┬───────┘
          │                     │
          └─────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
    ┌─────▼─────┐         ┌──────▼──────┐
    │   Feed    │         │   Search    │
    │   Page    │         │    Page     │
    └─────┬─────┘         └──────┬───────┘
          │                      │
          │                      │
    ┌─────▼─────┐         ┌──────▼──────┐
    │  Create   │         │   User     │
    │   Post    │         │  Results   │
    └─────┬─────┘         └──────┬───────┘
          │                      │
          │                      ▼
          │              ┌──────────────┐
          │              │   Profile    │
          │              │    Page      │
          │              └──────┬───────┘
          │                     │
          │              ┌───────▼───────┐
          │              │  Edit Profile │
          │              └───────────────┘
          │
    ┌─────▼─────┐
    │   Post    │
    │  Created  │
    └─────┬─────┘
          │
          ▼
        FEED
```

---

## Database ERD (Entity Relationship Diagram)

```
                    ┌─────────────────┐
                    │      USER       │
                    ├─────────────────┤
                    │ PK: _id         │
                    │     name        │
                    │     email       │
                    │     password    │
                    │     profilePic  │
                    │     bio         │
                    │     createdAt   │
                    │     updatedAt   │
                    └────────┬─────────┘
                             │
                             │ 1
                             │
                             │ creates
                             │
                             │ N
                    ┌────────▼─────────┐
                    │      POST        │
                    ├─────────────────┤
                    │ PK: _id         │
                    │ FK: userId      │──┐
                    │     content     │  │
                    │     image       │  │
                    │     likes[]     │──┼──┐
                    │     dislikes[]  │──┼──┼──┐
                    │     createdAt   │  │  │  │
                    │     updatedAt  │  │  │  │
                    └─────────────────┘  │  │  │
                                          │  │  │
                    Relationships:        │  │  │
                    • User 1 ──→ N Posts │  │  │
                    • User N ──→ N Posts  │  │  │
                      (via likes)        │  │  │
                    • User N ──→ N Posts │  │  │
                      (via dislikes)     │  │  │
                                         └──┴──┴──┘
```

---

## Component Hierarchy

```
App.jsx (Root Component)
│
├── Navigation Component
│   ├── Desktop Navigation
│   │   ├── Logo
│   │   ├── Links (Feed, Create, Search, Profile)
│   │   └── User Dropdown Menu
│   │       ├── View Profile
│   │       ├── Edit Profile
│   │       └── Logout
│   │
│   ├── Mobile Navigation
│   │   ├── Hamburger Menu
│   │   └── Mobile Menu Links
│   │
│   └── Mobile User Menu
│       └── Profile Dropdown
│
└── Routes
    ├── /login → Login Component
    ├── /register → Register Component
    ├── / → Feed Component
    │   └── PostCard Component (multiple)
    │       ├── Post Header
    │       ├── Post Content
    │       ├── Post Image
    │       └── Like/Dislike Buttons
    │
    ├── /create → CreatePost Component (Protected)
    ├── /edit/:id → EditPost Component (Protected)
    ├── /profile/:id → Profile Component
    │   └── PostCard Component (user's posts)
    ├── /profile/:id/edit → EditProfile Component (Protected)
    └── /search → Search Component
        ├── Search Input
        ├── Tabs (All/Users/Posts)
        ├── User Result Cards
        └── PostCard Components
```

---

## API Request Flow

```
User Action          Frontend              Backend              Database
─────────────────────────────────────────────────────────────────────────

Login
  │                    │                      │                    │
  │──Submit Form──────►│                      │                    │
  │                    │──POST /api/login───►│                    │
  │                    │                      │──Find User────────►│
  │                    │                      │◄──User Data────────│
  │                    │                      │──Verify Password   │
  │                    │                      │──Generate JWT      │
  │                    │◄──Token + User──────│                    │
  │◄──Store Token──────│                      │                    │
  │                    │                      │                    │

Create Post
  │                    │                      │                    │
  │──Fill Form────────►│                      │                    │
  │──Submit────────────►│                      │                    │
  │                    │──POST /api/post─────►│                    │
  │                    │  (with token)        │──Verify Token      │
  │                    │                      │──Create Post───────►│
  │                    │                      │                    │──Save
  │                    │◄──Post Data──────────│◄──Post Saved───────│
  │◄──Redirect─────────│                      │                    │

Search
  │                    │                      │                    │
  │──Type Query───────►│                      │                    │
  │                    │──Debounce (300ms)    │                    │
  │                    │──GET /api/search────►│                    │
  │                    │  ?q=query            │──Search Users─────►│
  │                    │                      │──Search Posts─────►│
  │                    │                      │◄──Results──────────│
  │                    │◄──Users + Posts──────│                    │
  │◄──Display Results──│                      │                    │
```

---

## Security Flow

```
                    User Registration
                           │
                           ▼
                    ┌─────────────┐
                    │  Input      │
                    │  Validation │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Check      │
                    │  Duplicate  │
                    │  Email      │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Hash       │
                    │  Password   │
                    │  (bcrypt)   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Save to    │
                    │  Database   │
                    └─────────────┘

                    User Login
                           │
                           ▼
                    ┌─────────────┐
                    │  Find User  │
                    │  by Email   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Compare    │
                    │  Password   │
                    │  (bcrypt)   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Generate   │
                    │  JWT Token  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Return     │
                    │  Token      │
                    └─────────────┘

                    Protected Route
                           │
                           ▼
                    ┌─────────────┐
                    │  Extract    │
                    │  Token from │
                    │  Header     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Verify     │
                    │  Token      │
                    │  (JWT)      │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │             │
              Valid │             │ Invalid
                    │             │
                    ▼             ▼
            ┌───────────┐   ┌───────────┐
            │  Allow    │   │  Deny     │
            │  Access   │   │  (401)    │
            └───────────┘   └───────────┘
```

