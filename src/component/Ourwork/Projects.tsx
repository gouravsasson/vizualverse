import { useState } from "react";
import { Box, ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ext1 from "../../assets/New/Exterior/1.webp";
import ext2 from "../../assets/New/Exterior/2.webp";
import ext3 from "../../assets/New/Exterior/3.webp";
import ext4 from "../../assets/New/Exterior/4.webp";
import ext5 from "../../assets/New/Exterior/5.webp";
import ext6 from "../../assets/New/Exterior/6.webp";
import ext7 from "../../assets/New/Exterior/7.webp";
import ext8 from "../../assets/New/Exterior/8.webp";
import ext9 from "../../assets/New/Exterior/9.webp";
import ext10 from "../../assets/New/Exterior/10.webp";
import ext11 from "../../assets/New/Exterior/11.webp";
import ext12 from "../../assets/New/Exterior/12.webp";
import ext13 from "../../assets/New/Exterior/13.webp";
import ext14 from "../../assets/New/Exterior/14.webp";
import ext15 from "../../assets/New/Exterior/15.webp";
import ext16 from "../../assets/New/Exterior/16.webp";
import ext17 from "../../assets/New/Exterior/17.webp";
import ext18 from "../../assets/New/Exterior/18.webp";
import ext19 from "../../assets/New/Exterior/19.webp";
import lowext1 from "../../assets/lowres/Exterior/1.webp";
import lowext2 from "../../assets/lowres/Exterior/2.webp";
import lowext3 from "../../assets/lowres/Exterior/3.webp";
import lowext4 from "../../assets/lowres/Exterior/4.webp";
import lowext5 from "../../assets/lowres/Exterior/5.webp";
import lowext6 from "../../assets/lowres/Exterior/6.webp";
import lowext7 from "../../assets/lowres/Exterior/7.webp";
import lowext8 from "../../assets/lowres/Exterior/8.webp";
import lowext9 from "../../assets/lowres/Exterior/9.webp";
import lowext10 from "../../assets/lowres/Exterior/10.webp";
import lowext11 from "../../assets/lowres/Exterior/11.webp";
import lowext12 from "../../assets/lowres/Exterior/12.webp";
import lowext13 from "../../assets/lowres/Exterior/13.webp";
import lowext14 from "../../assets/lowres/Exterior/14.webp";
import lowext15 from "../../assets/lowres/Exterior/15.webp";
import lowext16 from "../../assets/lowres/Exterior/16.webp";
import lowext17 from "../../assets/lowres/Exterior/17.webp";
import lowext18 from "../../assets/lowres/Exterior/18.webp";
import lowext19 from "../../assets/lowres/Exterior/19.webp";
import int1 from "../../assets/New/Interior/1.webp";
import int2 from "../../assets/New/Interior/2.webp";
import int3 from "../../assets/New/Interior/3.webp";
// import int4 from "../../assets/New/Interior/4.webp";
import int5 from "../../assets/New/Interior/5.webp";
import int6 from "../../assets/New/Interior/6.webp";
import int7 from "../../assets/New/Interior/7.webp";
import int8 from "../../assets/New/Interior/8.webp";
import int9 from "../../assets/New/Interior/9.webp";
import int10 from "../../assets/New/Interior/10.webp";
import int11 from "../../assets/New/Interior/11.webp";
import int12 from "../../assets/New/Interior/12.webp";
import int13 from "../../assets/New/Interior/13.webp";
import int14 from "../../assets/New/Interior/14.webp";
import int15 from "../../assets/New/Interior/15.webp";
import int16 from "../../assets/New/Interior/16.webp";
import int17 from "../../assets/New/Interior/17.webp";
import int18 from "../../assets/New/Interior/18.webp";
import int19 from "../../assets/New/Interior/19.webp";
import int21 from "../../assets/New/Interior/21.webp";
import int23 from "../../assets/New/Interior/23.webp";
import int24 from "../../assets/New/Interior/24.webp";
import int25 from "../../assets/New/Interior/25.webp";
import lowint1 from "../../assets/lowres/Interior/1.webp";
import lowint2 from "../../assets/lowres/Interior/2.webp";
import lowint3 from "../../assets/lowres/Interior/3.webp";
// import lowint4 from "../../assets/lowres/Interior/4.webp";
import lowint5 from "../../assets/lowres/Interior/5.webp";
import lowint6 from "../../assets/lowres/Interior/6.webp";
import lowint7 from "../../assets/lowres/Interior/7.webp";
import lowint8 from "../../assets/lowres/Interior/8.webp";
import lowint9 from "../../assets/lowres/Interior/9.webp";
import lowint10 from "../../assets/lowres/Interior/10.webp";
import lowint11 from "../../assets/lowres/Interior/11.webp";
import lowint12 from "../../assets/lowres/Interior/12.webp";
import lowint13 from "../../assets/lowres/Interior/13.webp";
import lowint14 from "../../assets/lowres/Interior/14.webp";
import lowint15 from "../../assets/lowres/Interior/15.webp";
import lowint16 from "../../assets/lowres/Interior/16.webp";
import lowint17 from "../../assets/lowres/Interior/17.webp";
import lowint18 from "../../assets/lowres/Interior/18.webp";
import lowint19 from "../../assets/lowres/Interior/19.webp";
import lowint21 from "../../assets/lowres/Interior/21.webp";
import lowint23 from "../../assets/lowres/Interior/23.webp";
import lowint24 from "../../assets/lowres/Interior/24.webp";
import lowint25 from "../../assets/lowres/Interior/25.webp";

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
  ...[
    { low: lowext1, high: ext1 },
    { low: lowext2, high: ext2 },
    { low: lowext3, high: ext3 },
    { low: lowext4, high: ext4 },
    { low: lowext5, high: ext5 },
    { low: lowext6, high: ext6 },
    { low: lowext7, high: ext7 },
    { low: lowext8, high: ext8 },
    { low: lowext9, high: ext9 },
    { low: lowext10, high: ext10 },
    { low: lowext11, high: ext11 },
    { low: lowext12, high: ext12 },
    { low: lowext13, high: ext13 },
    { low: lowext14, high: ext14 },
    { low: lowext15, high: ext15 },
    { low: lowext16, high: ext16 },
    { low: lowext17, high: ext17 },
    { low: lowext18, high: ext18 },
    { low: lowext19, high: ext19 },
  ].map(({ low, high }) => ({
    thumbnail: low,
    imgs: high,
  })),

  ...[
    { low: lowint1, high: int1 },
    { low: lowint2, high: int2 },
    { low: lowint3, high: int3 },
    // { low: lowint4, high: int4 },
    { low: lowint5, high: int5 },
    { low: lowint6, high: int6 },
    { low: lowint7, high: int7 },
    { low: lowint8, high: int8 },
    { low: lowint9, high: int9 },
    { low: lowint10, high: int10 },
    { low: lowint11, high: int11 },
    { low: lowint12, high: int12 },
    { low: lowint13, high: int13 },
    { low: lowint14, high: int14 },
    { low: lowint15, high: int15 },
    { low: lowint16, high: int16 },
    { low: lowint17, high: int17 },
    { low: lowint18, high: int18 },
    { low: lowint19, high: int19 },
    { low: lowint21, high: int21 },
    { low: lowint23, high: int23 },
    { low: lowint24, high: int24 },
    { low: lowint25, high: int25 },
  ].map(({ low, high }) => ({
    thumbnail: low,
    imgs: high,
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
            const isInView = useInView(ref, {}); // Animation triggers when in view

            return (
              <motion.div
                key={index}
                ref={ref} // Attach ref to the motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                }}
              >
                <ImageListItem>
                  <img
                    src={item.thumbnail}
                    alt={`Image ${index + 1}`}
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
