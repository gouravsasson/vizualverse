import { useState} from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import img1 from "../../assets/Website_Input/Exterior 1/EXT 03-Night.jpg";
import img2 from "../../assets/Website_Input/Exterior 1/BLG-EX-03-0711.jpg";
import img3 from "../../assets/Website_Input/Exterior 2/Roof 1_Pool.jpg";
import img4 from "../../assets/Website_Input/Exterior 2/Roof 3-Amenity-0704.jpg";
import img5 from "../../assets/Website_Input/Exterior 3/BLG-EX-12-0711.jpg";
import img6 from "../../assets/Website_Input/Exterior 4/AURA-C2-Hero-0225.jpg";
import img7 from "../../assets/Website_Input/Exterior 4/AURA-C3-Hero 02-0225.jpg";
import img8 from "../../assets/Website_Input/Exterior 5/AURA-C1-Aerial-0224.jpg";
import img9 from "../../assets/Website_Input/Exterior 6/AURA-C10-Building Close Up-0225.jpg";
import img27 from "../../assets/Website_Input/Exterior 7/AURA-C9-Pool-0225.jpg";
import img11 from "../../assets/Website_Input/Exterior 8/182.jpg";
import img12 from "../../assets/Website_Input/Exterior 8/183.jpg";
import img13 from "../../assets/Website_Input/Interior 1/9.jpg";
import img14 from "../../assets/Website_Input/Interior 2/12.jpg";
import img15 from "../../assets/Website_Input/Interior 3/38.jpg";
import img16 from "../../assets/Website_Input/Interior 3/41.jpg";
import img17 from "../../assets/Website_Input/Interior 4/55.jpg";
import img19 from "../../assets/Website_Input/Interior 5/146.jpg";
import img20 from "../../assets/Website_Input/Interior 6/152.jpg";
import img21 from "../../assets/Website_Input/Interior 6/153.jpg";
import img22 from "../../assets/Website_Input/Interior 7/WhatsApp Image 2024-04-23 at 20.00.13_7a339b71.jpg";
import img23 from "../../assets/Website_Input/Interior 8/IMG_0070.webp";
import img24 from "../../assets/Website_Input/Interior 8/IMG_0077.webp";
import img25 from "../../assets/Website_Input/Interior 9/3_Bedroom.jpg";
import img26 from "../../assets/Website_Input/Interior 9/Insta_post.jpg";
import { CircleChevronRight } from 'lucide-react';
import { CircleArrowLeft } from 'lucide-react';
import { X } from 'lucide-react';
import './work.css'

type ItemData  = {
  thumbnail: string;
  title: string;
  imgs: string[];
};


const itemData: ItemData[] = [
  {
    thumbnail: img1,
    title: "Bed",
    imgs: [img1, img2],
  },
  {
    thumbnail: img3,
    imgs: [img3, img4],
    title: "Books",
  },
  {
    thumbnail: img5,
    imgs: [img5],
    title: "Sink",
  },
  {
    thumbnail: img6,
    imgs: [img6, img7],
    title: "Kitchen",
  },
  {
    thumbnail: img8,
    imgs: [img8],
    title: "Blinds",
  },
  {
    thumbnail: img9,
    imgs: [img9],
    title: "Chairs",
  },
  {
    thumbnail: img27,
    imgs: [img27],
    title: "Laptop",
  },
  {
    thumbnail: img11,
    imgs: [img11, img12],
    title: "Doors",
  },
  {
    thumbnail: img13,
    imgs: [],
    title: "Coffee",
  },
  {
    thumbnail: img14,
    imgs: [img14],
    title: "Storage",
  },
  {
    thumbnail: img15,
    imgs: [img15, img16],
    title: "Candle",
  },
  {
    thumbnail: img17,
    imgs: [img17],
    title: "Coffee table",
  },
  {
    thumbnail: img19,
    imgs: [img19],
    title: "Coffee table",
  },
  {
    thumbnail: img20,
    imgs: [img20, img21],
    title: "Coffee table",
  },
  {
    thumbnail: img22,
    imgs: [img22],
    title: "Coffee table",
  },
  {
    thumbnail: img23,
    imgs: [img23, img24],
    title: "Coffee table",
  },
  {
    thumbnail: img25,
    imgs: [img25, img26],
    title: "Coffee table",
  },
];

export default function Project() {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Open modal and set images
  const handleClickOpen = (imgs: string[] ) => {
    if (imgs && imgs.length > 0) {
      setCurrentImages(imgs);
      setCurrentIndex(0);
      setOpen(true);
    }
  };

  
  const handleCloseModal = () => {
    setOpen(false);
    setCurrentImages([]);
    setCurrentIndex(0);
  };

  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {open && (
        <div className="sliderWrap">
          <X
            className="btnClose"
            onClick={handleCloseModal}
          />
          <CircleArrowLeft
            className="btnPrev"
            onClick={prevSlide}
          />
          <CircleChevronRight
            className="btnNext"
            onClick={nextSlide}
          />
          <div className="fullScreenImage">
            <img src={currentImages[currentIndex]} alt={`Slide ${currentIndex}`} />
          </div>
        </div>
      )}

      <Box className="w-full">
        <ImageList variant="masonry" cols={isSmallScreen ? 2 : 3} gap={16}>
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                style={{
                  cursor: item.imgs.length > 0 ? "pointer" : "default",
                  opacity: item.imgs.length > 0 ? 1 : 0.5,
                }}
                onClick={() => handleClickOpen(item.imgs)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}