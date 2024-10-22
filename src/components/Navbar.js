import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import LogoBigSVG from './LogoBig';



function MainNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { keycloak, initialized } = useKeycloak();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownLinkClick = () => {
    setTimeout(() => setIsDropdownOpen(false), 100);
  };

  const handleAuthAction = () => {
    if (initialized) {
      if (keycloak.authenticated) {
        keycloak.logout({
          redirectUri: "http://localhost:3000/"
        });
      } else {
        keycloak.login();
      }
    }
  };

  return (
    <header className="bg-[#648c4c]">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="block">
          <div className="w-20 h-20">
            <LogoBigSVG />
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-between md:justify-between">
          <nav aria-label="Global" className="hidden md:block flex-grow-1">
            <ul className="flex items-center gap-8 text-lg">
              <li>
                <Link to="/" className="text-white font-medium transition hover:text-[#5e4e2b]">Home</Link>
              </li>
              <li>
                <Link to="/Scan" className="text-white font-medium transition hover:text-[#5e4e2b]">Scan</Link>
              </li>
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-white font-medium transition hover:text-[#5e4e2b]"
                >
                  More
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-[#648c4c] rounded-md shadow-lg py-1 z-50">
                    <Link 
                      to="/History" 
                      className="block text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                      onClick={handleDropdownLinkClick}
                    >
                      History
                    </Link>
                    <Link 
                      to="/Analyze" 
                      className="block text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                      onClick={handleDropdownLinkClick}
                    >
                      Analyze
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <button
                onClick={handleAuthAction}
                className="block rounded-md bg-[#5e4e2b] px-8 py-3 text-base font-medium text-white transition hover:bg-[#4a3e22]"
              >
                {keycloak.authenticated ? 'Logout' : 'Sign in'}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#648c4c]">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li><Link to="/" className="block text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-lg font-medium text-center">Home</Link></li>
            <li><Link to="/Scan" className="block text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-lg font-medium text-center">Scan</Link></li>
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-lg font-medium text-center"
              >
                More
              </button>
              {isDropdownOpen && (
                <div className="pl-4">
                  <Link to="/History" onClick={handleDropdownLinkClick} className="block text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-base font-medium text-center">History</Link>
                  <Link to="/Analyze" onClick={handleDropdownLinkClick} className="block text-white hover:bg-[#5e4e2b] px-3 py-2 rounded-md text-base font-medium text-center">Analyze</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default MainNavBar;