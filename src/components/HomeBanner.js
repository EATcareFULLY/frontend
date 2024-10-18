import React from 'react';

function HomeBanner() {
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        className="absolute w-full h-full object-cover pointer-events-none select-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://videos.pexels.com/video-files/3209239/3209239-uhd_2560_1440_25fps.mp4" type="video/mp4" />
    
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 animate-fadeIn">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-[#648c4c]">
            Welcome to
            <strong className="block font-extrabold text-[#5e4e2b]"> EATcareFULLY! </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed text-[#ffffff]">
          Discover a new way to manage your dietary habits and stay healthy. Our application helps you keep track of your meals, provides nutritional insights, and guides you towards a balanced diet.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded bg-[#648c4c] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#5e4e2b] focus:outline-none focus:ring active:bg-[#5e4e2b] sm:w-auto transition-colors duration-300"
            >
              Get Started
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#648c4c] shadow hover:text-[#5e4e2b] focus:outline-none focus:ring active:text-[#5e4e2b] sm:w-auto transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// CSS for animation
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
  
.animate-fadeIn {
  animation: fadeIn 1s ease-in;
}
`;

export default function AnimatedHomeBanner() {
  return (
    <>
      <style>{styles}</style>
      <HomeBanner />
    </>
  );
}