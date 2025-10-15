import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import About from "./components/About";
import JoeziSection from "./components/JoeziSection";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      {/* <Navbar /> */}
      <Hero />
      <JoeziSection />
      <About />
      <Schedule />
      <Footer />
    </div>
  );
}
