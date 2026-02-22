import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  {label: "Projects", href: "#Projects"},
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
  
  
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, label, href) => {
    e.preventDefault();
    setActive(label);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      {/* Desktop pill navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="pointer-events-auto hidden sm:flex items-center gap-2 px-5 py-2 rounded-full min-w-[520px] justify-center"
        style={{
          background: scrolled
            ? "rgba(10, 10, 30, 0.55)"
            : "rgba(20, 20, 50, 0.35)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
          transition: "background 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "Home", "#home")}
          className="text-sm font-semibold text-white/90 px-3 py-1.5 mr-2 tracking-wide"
        >
          Krishna
        </a>

        {/* Divider */}
        <div className="w-px h-4 bg-white/15 mr-2" />

        {/* Nav links */}
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleNavClick(e, label, href)}
            className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
            style={{
              color: active === label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)",
            }}
          >
            {active === label && (
              <motion.span
                layoutId="pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </a>
        ))}
      </motion.nav>

      {/* Mobile bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="pointer-events-auto flex sm:hidden w-full items-center justify-between px-5 py-3 rounded-2xl"
        style={{
          background: "rgba(12, 12, 35, 0.6)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <a href="#home" onClick={(e) => handleNavClick(e, "Home", "#home")} className="text-sm font-semibold text-white/90 tracking-wide">
          KM
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer text-white/60 hover:text-white focus:outline-none"
        >
          <img
            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
            className="w-5 h-5"
            alt="toggle"
          />
        </button>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto absolute top-[4.5rem] left-4 right-4 sm:hidden rounded-2xl overflow-hidden"
            style={{
              background: "rgba(12, 12, 35, 0.75)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.13)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <ul className="flex flex-col py-2">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => { handleNavClick(e, label, href); setIsOpen(false); }}
                    className="flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors"
                    style={{
                      color: active === label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)",
                      background: active === label ? "rgba(255,255,255,0.07)" : "transparent",
                    }}
                  >
                    {label}
                    {active === label && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
