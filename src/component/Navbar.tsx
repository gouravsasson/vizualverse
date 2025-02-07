import { Button } from "../components/ui/button";
import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import logo from "../assets/Logo.png";
function Navbar() {
  return (
    <div className=" bg-black px-[36px] py-5 flex items-center justify-between">
      <div>
        <img className=" w-[148px]" src={logo} alt="" />
      </div>
      <div className=" flex gap-6">
        <Button
          onClick={() =>
            document
              .getElementById("ourwork")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          variant="ghost"
        >
          OUR WORK
        </Button>
        <Button
          onClick={() =>
            document
              .getElementById("whatwedo")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          variant="ghost"
        >
          WHAT WE DO
        </Button>
        {/* <Button variant="ghost">SAY HELLO</Button> */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              "https://www.instagram.com/vizual.verse?igsh=Z3U4dzhjMzZqMDBu&utm_source=qr",
              "_blank" // Opens the link in a new tab
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
              "_blank" // Opens the link in a new tab
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
