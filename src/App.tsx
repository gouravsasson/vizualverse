import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Ourwork from "./component/Ourwork/Ourwork";
import Service from "./component/Ourservices/Service";
import Footer from "./component/Footer/Footer";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling Down
        setShowNavbar(false);
      } else {
        // Scrolling Up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className="overflow-hidden">
        {/* Navbar */}
        <div
          className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
            showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Navbar />
        </div>

        {/* Hero Section */}
        <div className="w-screen h-screen bg-black flex flex-col">
          <Hero />
        </div>

        {/* Other Sections */}
        <div id="ourwork" className="w-screen bg-black flex flex-col">
          <Ourwork />
        </div>
        <div className="w-screen bg-black flex flex-col">
          <Service />
        </div>
        <div className="w-screen bg-black flex flex-col">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
