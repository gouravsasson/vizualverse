"use client";

import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollTo = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <div className=" bg-black px-[36px] py-5 flex items-center justify-between">
      <div>
        <Link href="/">
          <CldImage
            className=" w-[148px]"
            src="vizualverse/Logo"
            alt="Vizualverse Logo"
            width={148}
            height={40}
          />
        </Link>
      </div>
      <div className=" flex gap-6">
        <Button onClick={() => scrollTo("ourwork")} variant="ghost">
          OUR WORK
        </Button>
        <Button onClick={() => scrollTo("whatwedo")} variant="ghost">
          WHAT WE DO
        </Button>
        <Link href="/contact">
          <Button variant="ghost">CONTACT</Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              "https://www.instagram.com/vizual.verse?igsh=Z3U4dzhjMzZqMDBu&utm_source=qr",
              "_blank"
            )
          }
        >
          <FaInstagram />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              "https://www.behance.net/vizualverse",
              "_blank"
            )
          }
        >
          <FaBehance />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
