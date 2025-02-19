
# 🐸 Froggy - A Discord-Inspired Social Platform

Welcome to Froggy, a unique social platform that combines the community-driven features of Discord with the dynamic content flow of Twitter, all wrapped in a delightful pastel frog aesthetic.

## 🌟 Features

### Authentication & User Management
- Email/password authentication
- User profiles with customizable avatars and usernames
- Real-time online status tracking
- Custom status messages

### Server System
- Create and join community servers
- Hierarchical channel structure
  - Text channels
  - Voice channels
  - Announcement channels
- Server customization options
  - Server icons
  - Role management
  - Permission systems
- Invite system with configurable invite links

### Communication Features
- Real-time messaging
- Thread support
- Message reactions and pins
- File attachments
- Voice chat capabilities
- Screen sharing
- Message history

## 🏗 Technical Architecture

### Database Schema

#### Core Tables
1. **profiles**
   - Stores user information
   - Fields: id, username, avatar_url, status, custom_status
   - Connected to Supabase auth.users

2. **servers**
   - Community spaces
   - Fields: id, name, icon_url, owner_id, metadata
   - Features: verification levels, boost status, community features

3. **categories**
   - Channel groupings within servers
   - Fields: id, server_id, name, position
   - Hierarchical organization of channels

4. **channels**
   - Communication spaces
   - Types: TEXT, VOICE, ANNOUNCEMENT
   - Fields: id, server_id, category_id, name, type, position, topic, settings

5. **messages**
   - Content storage
   - Fields: id, channel_id, author_id, content, attachments
   - Supports: threads, edits, reactions

#### Relationship Tables
1. **server_members**
   - Links users to servers
   - Fields: id, server_id, user_id, nickname, roles, joined_at

2. **member_roles**
   - Role assignments
   - Fields: member_id, role_id

3. **channel_member_states**
   - User state in channels
   - Fields: channel_id, user_id, last_read_at, mention_count, muted

### Security & Permissions

#### Row Level Security (RLS)
- Server access restricted to members
- Channel access based on server membership and role permissions
- Message visibility controlled by channel access
- Profile information visible to authenticated users

#### Role-Based Access Control
- Hierarchical permission system
- Granular channel permissions
- Server-wide role management
- Custom role colors and positions

### Real-time Features
- Implemented using Supabase's real-time subscriptions
- Message delivery
- Online status updates
- Typing indicators
- Voice state synchronization

## 🎨 UI/UX Design Philosophy

### Theme
- Pastel color palette inspired by frogs and nature
- Soft, organic shapes and transitions
- Glassmorphism effects for depth
- High contrast for accessibility

### Layout
- Responsive design for all screen sizes
- Intuitive navigation
- Clean, uncluttered interfaces
- Consistent spacing and alignment

## 🚀 Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## 🔧 Technology Stack

- **Frontend**
  - React with TypeScript
  - Vite for build tooling
  - Tailwind CSS for styling
  - Shadcn UI components
  - React Query for data management

- **Backend** (Supabase)
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage for files and media
  - Row Level Security

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── server/        # Server-related components
│   ├── ui/            # Base UI components
│   └── auth/          # Authentication components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── pages/             # Route components
├── types/             # TypeScript definitions
└── utils/             # Utility functions
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

