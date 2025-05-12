"use client";
import Link from "next/link"; // For navigation

const AboutUs = () => {
  return (
    <>
      {/* Navbar */}
      <div className='fixed top-0 left-0 w-full bg-black text-white z-50 p-4 shadow-lg'>
        <div className='flex justify-between items-center gap-4 px-4'>
          <h1 className='font-title2 text-2xl'>about us</h1>
          <div className='flex gap-6'>
            <Link href='/'>Home</Link>
            <Link href='/contact' className='  '>
              Contact
            </Link>
          </div>
        </div>
      </div>
      <section className='py-12 px-6 md:px-16 '>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-8'>
            {/* Left Side Content: Text */}
            <div className='space-y-6'>
              <h2 className='text-xl font-semibold   text-center sm:text-left'>
                Why our platform ?
              </h2>
              <p className='text-lg text-gray-700'>
                This is a social media website.We are a team of passionate
                professionals committed to delivering excellent user exprience
                solutions. With years of experience in the industry, we bring
                innovative ideas to the table to help our user achieve their
                goals and make the world beautiful.
              </p>
              <p className='text-lg text-gray-700'>
                Our mission is to make the world a better place by providing
                top-notch alerm and solutions that cater to the diverse needs of
                businesses and individuals.
              </p>
              <p className='block text-center sm:text-left   transition-colors mt-4 px-6 py-2 border-2  rounded-full w-full sm:w-auto'>
                Learn More About Us
              </p>
            </div>

            {/* Right Side Content: Image */}
            <div className='flex justify-center items-center'>
              {/* <img
              src="https://via.placeholder.com/400"
              alt="About Us Image"
              className="w-full max-w-md rounded-lg shadow-lg"
            /> */}
              <p className='text-5xl font-title2'>Find everything here</p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className='mt-12 space-y-6'>
            <h3 className='text-2xl font-semibold  text-center'>Our Mission</h3>
            <p className='text-lg text-gray-700 text-center'>
              Make The world Happy.
            </p>
          </div>

          {/* Meet the Team Section */}
          <div className='mt-12 text-center'>
            <h3 className='text-2xl font-semibold '>Meet the Team</h3>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
              {/* Team Member 1 */}
              <div className='space-y-4'>
                <img
                  src='https://i.ibb.co.com/GH6V7Wx/my.jpg'
                  alt='Team Member'
                  className='rounded-full w-40 h-40 mx-auto'
                />
                <h4 className='text-lg font-semibold '>Mostafizur Rahman</h4>
                <p className='text-gray-600'>Team Leader</p>
              </div>

              {/* Team Member 2 */}
              <div className='space-y-4'>
                <img
                  src='https://i.ibb.co.com/0B4bm5Y/toy-banner.png'
                  alt='Team Member'
                  className='rounded-full w-40 h-40 mx-auto'
                />
                <h4 className='text-lg font-semibold '>Tithi</h4>
                <p className='text-gray-600'>Frontend Engineer</p>
              </div>

              {/* Team Member 3 */}
              <div className='space-y-4'>
                <img
                  src='https://i.ibb.co.com/hVjtq2W/error.jpg'
                  alt='Team Member'
                  className='rounded-full w-40 h-40 mx-auto'
                />
                <h4 className='text-lg font-semibold '>Nijhum</h4>
                <p className='text-gray-600'>Marketing Director</p>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <div className='mt-12 text-center'>
            <h3 className='text-2xl font-semibold '>Our Story</h3>
            <p className='text-lg text-gray-700 mt-4'>
              Our journey began with a vision to create impactful solutions for
              businesses. Over the years, we have expanded our reach and refined
              our expertise to become leaders in the industry.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
