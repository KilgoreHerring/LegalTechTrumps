import { Outlet } from 'react-router-dom'
import { SolutionsProvider } from './store/solutions-context'
import Header from './components/layout/Header'
import './App.css'

export default function App() {
  return (
    <SolutionsProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </SolutionsProvider>
  )
}
