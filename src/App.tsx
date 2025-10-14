import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import About from "./components/About";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <Schedule />
      <Footer />
    </div>
  );
}
