import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0); // Start with the first slide immediately

  const slides = [
    {
      id: 1,
      content: (
        <>
          <p>
            <span className="text-4xl font-bold">"Bringing Ideas to Life with 3D Precision"</span>
            {/* <span className="text-2xl">a team of architects, 3D modellers, urban designers,</span> */}
          </p>
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <p>
            <span className="text-4xl font-bold">Welcome to Vizualverse, </span>
            <span className="text-2xl">a premier 3D visualization agency based in the</span>
            <br />
            <span className="text-2xl">heart of Dubai. We specialize in crafting</span>{" "}
            <span className="text-2xl">
              <span className="text-4xl font-extrabold text-[#424241] capitalize">
                PHOTOREALISTIC RENDERS, <br /> IMMERSIVE ANIMATIONS, AND INTERACTIVE VIRTUAL
                <br /> TOURS
              </span>{" "}
            </span>
            <span className="text-4xl font-bold">
              for architects, interior designers, and developers.
            </span>
          </p>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <p>
            <span className="text-4xl font-bold">At Vizualverse, </span>
            <span className="text-2xl">we understand that every design has a </span>
            <br />
            <span className="text-2xl">
              story to tell, and our mission is to bring that story to life through
            </span>{" "}
            <br />
            <span className="text-2xl">visuals that inspire and engage. With a focus on</span>{" "}
            <span className="text-2xl">
              <span className="text-4xl font-extrabold text-[#424241] capitalize">
                QUALITY, <br />
                CREATIVITY, AND ATTENTION TO DETAIL,
              </span>{" "}
            </span>
            <br />
            <span className="text-4xl font-bold">
              we transform concepts into stunning <br /> visual experiences that leave a lasting
              <br /> impression.
            </span>
          </p>
        </>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Loop through slides
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  return (
    <div className="relative h-full text-white flex justify-center items-center">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentIndex && (
              <motion.div
                key={slide.id}
                className="absolute"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
              >
                {slide.content}
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}

export default Hero;
