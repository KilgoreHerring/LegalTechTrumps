import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import DashboardPage from './pages/DashboardPage'
import AddSolutionPage from './pages/AddSolutionPage'
import SolutionPage from './pages/SolutionPage'
import EditSolutionPage from './pages/EditSolutionPage'
import ComparisonPage from './pages/ComparisonPage'
import SettingsPage from './pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'add', element: <AddSolutionPage /> },
      { path: 'solution/:id', element: <SolutionPage /> },
      { path: 'solution/:id/edit', element: <EditSolutionPage /> },
      { path: 'compare', element: <ComparisonPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
