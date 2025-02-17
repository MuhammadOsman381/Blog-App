import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SidebarProvider, } from './components/ui/sidebar.tsx'
import { SideBar } from './screens/SideBar.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './screens/LoginPage.tsx'
import App from './App.tsx'
import NavBar from './components/NavBar.tsx'
import SignUpPage from './screens/SignUpPage.tsx'
import { Toaster } from "react-hot-toast"
import Profile from './screens/Profile.tsx'
import CreateBlog from './screens/CreateBlog.tsx'
import Home from './screens/Home.tsx'
import SingleBlog from './screens/SingleBlog.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/user"
          element={
            <SidebarProvider>
              <SideBar />
              <main className="w-full">
                <NavBar />
                <App />
              </main>
            </SidebarProvider>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="home/:blogId" element={<SingleBlog />} />
          <Route path="create-blogs" element={<CreateBlog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)