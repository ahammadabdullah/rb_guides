import { Navigation, Section } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className=" text-left bg-primary/[0.07] rounded-t-[12px] mt-20 p-10 flex justify-between">
      {/* left */}
      <div>
        <h3 className="text-4xl font-medium font-clash ">
          <div className="flex gap-2 items-center">
            <Navigation width={37} height={37} color="#D8A3B5" fill="#D8A3B5" />
            <h3 className="font-black text-2xl">RB Guides</h3>
          </div>
        </h3>
        <div className="flex flex-col gap-10">
          <p className="text-lg font-medium">
            Find the best guides for your favorite trip.
          </p>
          <p className="text-lg font-medium">© RB Guides 2024</p>
        </div>
      </div>
      {/* right */}
      <div className="flex gap-10">
        <div className=" font-semibold flex flex-col text-left gap-3 justify-center ">
          <p className="font-bold text-xl">Useful links</p>
          <Link className="hover:underline" href="/register">
            Become a guide
          </Link>
          <Link className="hover:underline" href="/about">
            About Us
          </Link>
          <Link className="hover:underline" href="/terms">
            Terms and Conditions
          </Link>
          <Link className="hover:underline" href="/terms">
            Support
          </Link>
        </div>
        <div className="font-semibold text-left flex flex-col gap-3">
          <p className="font-bold text-xl">Contact</p>
          <p>Phone: +880123456789</p>
          <p>Email: help@rbguides.com</p>
          <p>Address: Dhaka, Bangladesh </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

//<p>help@rbguides.com</p>
{
  /*  */
}
