# Task Management Dashboard

A modern, collaborative task management application built with React, TypeScript, and Vite. Features real-time updates, drag-and-drop functionality, team collaboration, and comprehensive analytics.

## ✨ Features

- **📋 Kanban Board**: Drag-and-drop task management with customizable columns
- **👥 Team Collaboration**: User assignment and role-based access
- **📊 Analytics Dashboard**: Real-time charts and progress tracking
- **🎨 Modern UI**: Clean, responsive design with Tailwind CSS
- **⚡ Real-time Updates**: Live collaboration with Socket.io integration
- **🔍 Smart Search**: Quick task and project search functionality
- **📱 Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Framework**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query (React Query)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task-management-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header with search and notifications
│   ├── Sidebar.tsx     # Navigation sidebar with menu items
│   ├── TaskBoard.tsx   # Main kanban board component
│   ├── TaskCard.tsx    # Individual task card with drag functionality
│   ├── AddTaskModal.tsx # Modal for creating new tasks
│   └── Analytics.tsx   # Charts and analytics dashboard
├── store/              # State management
│   └── taskStore.ts    # Zustand store for tasks and users
├── types/              # TypeScript type definitions
│   └── index.ts        # Core application types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Core Features

### Task Management

- Create, edit, and delete tasks
- Assign tasks to team members
- Set priorities (Low, Medium, High, Urgent)
- Add due dates and tags
- Track task status (To Do, In Progress, Review, Done)

### Drag & Drop

- Intuitive drag-and-drop interface
- Move tasks between status columns
- Real-time visual feedback
- Smooth animations and transitions

### Analytics & Reporting

- Task completion metrics
- Priority distribution charts
- Progress tracking over time
- Team performance insights

### Collaboration

- User assignment and permissions
- Real-time updates (Socket.io ready)
- Comment system on tasks
- Activity notifications

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the `tailwind.config.js` file
2. Updating CSS classes in components
3. Adding custom styles in `src/index.css`

### State Management

The app uses Zustand for state management. You can extend the store by:

1. Adding new state properties in `taskStore.ts`
2. Creating additional stores for different domains
3. Implementing persistence with Zustand middleware

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for configuration:

```env
VITE_API_URL=your_api_url
VITE_SOCKET_URL=your_socket_url
```

### API Integration

The application is ready for backend integration. Update the API calls in:

- `src/store/taskStore.ts` for state management
- Add API service files in `src/api/` directory

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the `dist` folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- @dnd-kit for smooth drag-and-drop functionality
- Chart.js for beautiful data visualizations
- Lucide for the icon set

---

Built with ❤️ using React and modern web technologies.
