import { useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ext1 from "../../assets/New/Exterior/1.jpg";
import ext2 from "../../assets/New/Exterior/2.jpg";
import ext3 from "../../assets/New/Exterior/3.jpg";
import ext4 from "../../assets/New/Exterior/4.jpg";
import ext5 from "../../assets/New/Exterior/5.jpg";
import ext6 from "../../assets/New/Exterior/6.jpg";
import ext7 from "../../assets/New/Exterior/7.jpg";
import ext8 from "../../assets/New/Exterior/8.jpg";
import ext9 from "../../assets/New/Exterior/9.jpg";
import ext10 from "../../assets/New/Exterior/10.jpg";
import ext11 from "../../assets/New/Exterior/11.jpg";
import ext12 from "../../assets/New/Exterior/12.jpg";
import ext13 from "../../assets/New/Exterior/13.jpg";
import ext14 from "../../assets/New/Exterior/14.jpg";
import ext15 from "../../assets/New/Exterior/15.jpg";
import ext16 from "../../assets/New/Exterior/16.jpg";
import ext17 from "../../assets/New/Exterior/17.jpg";
import ext18 from "../../assets/New/Exterior/18.jpg";
import ext19 from "../../assets/New/Exterior/19.jpg";
import int1 from "../../assets/New/Interior/1.jpg";
import int2 from "../../assets/New/Interior/2.jpg";
import int3 from "../../assets/New/Interior/3.jpg";
import int4 from "../../assets/New/Interior/4.jpg";
import int5 from "../../assets/New/Interior/5.jpg";
import int6 from "../../assets/New/Interior/6.jpg";
import int7 from "../../assets/New/Interior/7.jpg";
import int8 from "../../assets/New/Interior/8.jpg";
import int9 from "../../assets/New/Interior/9.jpg";
import int10 from "../../assets/New/Interior/10.jpg";
import int11 from "../../assets/New/Interior/11.jpg";
import int12 from "../../assets/New/Interior/12.jpg";
import int13 from "../../assets/New/Interior/13.jpg";
import int14 from "../../assets/New/Interior/14.jpg";
import int15 from "../../assets/New/Interior/15.jpg";
import int16 from "../../assets/New/Interior/16.jpg";
import int17 from "../../assets/New/Interior/17.jpg";
import int18 from "../../assets/New/Interior/18.jpg";
import int19 from "../../assets/New/Interior/19.jpg";
import int21 from "../../assets/New/Interior/21.webp";
import int23 from "../../assets/New/Interior/23.webp";
import int24 from "../../assets/New/Interior/24.jpg";
import int25 from "../../assets/New/Interior/25.jpg";

import { X } from "lucide-react";
import "./work.css";
import { useRef } from "react";

// Define the ItemData type
interface ItemData {
  thumbnail: string;
  imgs: string;
}

// Create the itemData array
const itemData: ItemData[] = [
  // Exterior Images
  ...[
    ext1, ext2, ext3, ext4, ext5, ext6, ext7, ext8, ext9, ext10,
    ext11, ext12, ext13, ext14, ext15, ext16, ext17, ext18, ext19,
  ].map((img) => ({
    thumbnail: img,
    imgs: img,
  })),

  // Interior Images
  ...[
    int1, int2, int3, int4, int5, int6, int7, int8, int9, int10,
    int11, int12, int13, int14, int15, int16, int17, int18, int19, int21, int23, int24, int25,
  ].map((img) => ({
    thumbnail: img,
    imgs: img,
  })),
];

export default function Project() {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImages, setCurrentImages] = useState<string | null>(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Open modal and set images
  const handleClickOpen = (img: string) => {
    setCurrentImages(img);
    setOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpen(false);
    setCurrentImages(null);
  };

  return (
    <>
      {open && (
        <div className="sliderWrap">
          <X className="btnClose" onClick={handleCloseModal} />
          <div className="fullScreenImage">
            <img src={currentImages as string} alt="Fullscreen" />
          </div>
        </div>
      )}

<Box className="w-full">
  <ImageList variant="masonry" cols={isSmallScreen ? 2 : 3} gap={16}>
    {itemData.map((item, index) => {
      // Create a ref for each image
      const ref = useRef(null);
      const isInView = useInView(ref, { threshold: 0.1 }); // Animation triggers when 10% is visible

      return (
        <motion.div
          key={index}
          ref={ref} // Attach ref to the motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}} // Only animate when in view
          transition={{
            duration: 0.5,
            delay: index * 0.1, // Optional stagger effect
          }}
        >
          <ImageListItem>
            <img
              src={item.thumbnail}
              alt={`Image ${index + 1}`}
              loading="lazy"
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleClickOpen(item.imgs)}
            />
          </ImageListItem>
        </motion.div>
      );
    })}
  </ImageList>
</Box>
    </>
  );
}
