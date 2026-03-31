"use client";

import { CldImage } from "next-cloudinary";

function Footer() {
  return (
    <footer className="bg-[#424241] dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <CldImage
                src="vizualverse/footerlogo"
                className=" w-[120px] me-3"
                alt="Vizualverse Logo"
                width={120}
                height={40}
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Follow us</h2>
              <ul className="text-white dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://www.instagram.com/vizual.verse?igsh=Z3U4dzhjMzZqMDBu&utm_source=qr" className="hover:underline ">Instagram</a>
                </li>
                <li>
                  <a href="https://www.behance.net/vizualverse" className="hover:underline">Behance</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Contact us</h2>
              <ul className="text-white dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">sagar@vizualverse.com</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">+971588180257</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; 2025 <a href="" className="hover:underline">Vizualverse</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
