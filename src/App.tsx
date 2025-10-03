import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <Schedule />

      <Footer />
    </div>
  );
}
