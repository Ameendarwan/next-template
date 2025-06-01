import React from "react";
import SVGIcon from "../svg-icon";
import { FacebookIcon } from "lucide-react";

const Topbar = () => {
  return (
    <div className="bg-gray-50 px-4 py-2">
      <div className="max-w-7xl mx-auto max-sm:gap-2 flex md:justify-between justify-center flex-wrap items-center text-sm text-gray-200">
        <div
          className="flex space-x-6 flex-wrap max-sm:justify-center"
          aria-label="Topbar navigation links"
        >
          {["Company", " Downloads", " Contact us"].map((text, index) => (
            <div key={text} className="flex flex-row gap-2 items-center">
              <a
                key={text}
                href="#"
                className="hover:text-black text-gray-200 text-sm font-medium"
                aria-label={`Navigate to ${text.trim()}`}
              >
                {text}
              </a>
              {index === 0 && <SVGIcon icon="chevron" stroke="#6D727B" />}
            </div>
          ))}
        </div>
        <div
          className="flex max-sm:gap-2 items-center max-sm:justify-center flex-wrap space-x-4 text-gray-200 text-sm font-medium"
          aria-label="Topbar contact and office hours"
        >
          <span aria-label="Office hours" className="text-gray-200">
            Monday - Friday 8:30 AM - 5:30 PM
          </span>
          <span
            className="bg-gray-100 h-[20px] w-[1px] max-sm:hidden"
            aria-hidden="true"
          />
          <div
            className="flex flex-row items-center gap-2"
            aria-label="Email contact"
          >
            <SVGIcon icon="contact" stroke="black" aria-hidden="true" />
            <span aria-label="Email address" className="text-gray-200">
              office@germancard.de
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
