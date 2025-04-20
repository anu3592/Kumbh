import {
  FaTwitterSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaFacebookSquare,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaArrowCircleUp,
  FaWhatsappSquare, // Added WhatsApp Icon
} from "react-icons/fa";
import { useEffect, useState } from "react";

function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll button only after 200px scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative  w-screen mx-auto px-4 py-12 bg-[#1e1f23] text-gray-300">
      {/* Scroll-to-top button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 text-orange-500 hover:text-white transition-colors"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={36} />
        </button>
      )}

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Brand & Social */}
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Kumbh</h1>
          <p className="mt-4 text-sm text-gray-400 leading-6 max-w-md">
            Curating timeless, handcrafted décor from the heart of Indian
            artisanship. Now delivering globally with love and sustainability.
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              className="footerIcon-style"
              href="https://www.facebook.com/kumbh.pottery"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookSquare size={28} className="hover:text-blue-500" />
            </a>
            <a
              className="footerIcon-style"
              href="https://www.instagram.com/kumbh_handcrafted"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagramSquare size={28} className="hover:text-pink-500" />
            </a>
            <a
              className="footerIcon-style"
              href="https://twitter.com/kumbh_ceramics"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitterSquare size={28} className="hover:text-sky-400" />
            </a>
            <a
              className="footerIcon-style"
              href="https://wa.me/917807210742"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {/* Added WhatsApp Link */}
              <FaWhatsappSquare size={28} className="hover:text-green-500" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h6 className="footerStaticContent  mb-4 uppercase">Company</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="link-style">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="link-style">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/" className="link-style">
                  Shop
                </a>
              </li>
              <li>
                <a href="/" className=" link-style">
                  Store Locator
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="footerStaticContent mb-4 uppercase">Get in Touch</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+917006600321" className="detailsFooter">
                  +91 70066 00321
                </a>
              </li>
              <li>
                <a href="tel:+917890078902" className="detailsFooter">
                  +91 78900 78902
                </a>
              </li>
              <li className="footerStaticContent text-[#cd853f]">
                Mon–Sun: 10:00 AM – 10:00 PM
              </li>
              <li>
                <a href="mailto:hello@kumbhstore.com" className="detailsFooter">
                  hello@kumbhstore.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-end sm:ml-auto">
        <p className="footerStaticContent text-sm  mr-[25px]">We accept:</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <FaCcVisa size={36} className="text-blue-500" />
          <FaCcMastercard size={36} className="text-red-600" />
          <FaCcAmex size={36} className="text-blue-300" />
          <FaCcPaypal size={36} className="text-yellow-400" />
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Kumbh Store · Crafted with ♥ in India.
      </div>
    </footer>
  );
}

export default Footer;
