"use client";

import { useState, useRef, useEffect } from "react";
import { Box, ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { X, Loader2 } from "lucide-react";
import "./work.css";

interface GalleryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

function AnimatedImageItem({
  item,
  index,
  onClick,
}: {
  item: GalleryImage;
  index: number;
  onClick: (publicId: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {});

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <ImageListItem>
        <CldImage
          src={item.public_id}
          alt={`Image ${index + 1}`}
          width={600}
          height={400}
          style={{ cursor: "pointer", width: "100%", height: "auto" }}
          onClick={() => onClick(item.public_id)}
          loading="lazy"
        />
      </ImageListItem>
    </motion.div>
  );
}

export default function Project() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data.images || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const handleClickOpen = (publicId: string) => {
    setCurrentImage(publicId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCurrentImage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      {open && currentImage && (
        <div className="sliderWrap">
          <X className="btnClose" onClick={handleCloseModal} />
          <div className="fullScreenImage">
            <CldImage
              src={currentImage}
              alt="Fullscreen"
              width={1920}
              height={1080}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      <Box className="w-full">
        <ImageList variant="masonry" cols={isSmallScreen ? 2 : 3} gap={16}>
          {images.map((item, index) => (
            <AnimatedImageItem
              key={item.public_id}
              item={item}
              index={index}
              onClick={handleClickOpen}
            />
          ))}
        </ImageList>
      </Box>
    </>
  );
}
