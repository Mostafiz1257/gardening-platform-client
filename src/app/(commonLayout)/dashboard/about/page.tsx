import React from "react";

import MeetTheTeam from "@/src/components/shared/MeetTheTeam";

const AboutUs = () => {
  return (
    <div>
      <>
        <div className="relative max-w-7xl ">
          <h2 className="text-2xl  font-bold mb-4 text-center animate__animated animate__fadeIn">
            Our Story
          </h2>
          <div className="bg-black text-gray-500 rounded-lg shadow-lg  md:p-12 relative z-10">
            <p className="text-lg  animate__animated animate__fadeIn animate__delay-1s">
              <span className="text-xl text-[#003580] font-bold">T</span> oday
              our journey began in 20 years with a vision to Our journey began
              in 2010 with a vision to redefine the customer experience in the
              service industry.
            </p>
            <p className="text-lg mb-6 animate__animated animate__fadeIn animate__delay-2s">
              Today, we are proud of our achievements and excited about the
              future. Our mission remains to [Future Goals or Vision]. As we
              look ahead, we are committed to continuing our tradition of
              excellence and driving progress in our field.
            </p>
          </div>
        </div>
      </>
      <MeetTheTeam />
    </div>
  );
};

export default AboutUs;
