import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Gear from "./pages/Gear";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import OnlineCoursesPage from "./pages/OnlineCoursesPage";

export default function App() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="px-[10vw] pt-9 md:pt-[8.75rem]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gear" element={<Gear />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/courses" element={<OnlineCoursesPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer
        key={pathname}
        onBackToTop={() => lenisRef.current?.scrollTo(0, { duration: 1.4 })}
      />
    </main>
  );
}