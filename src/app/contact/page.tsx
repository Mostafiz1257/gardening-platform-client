"use client";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link"; // For navigation

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "", // New field to categorize inquiries
  });

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      toast.success("Message sent");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "",
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className='fixed top-0 left-0 w-full bg-black text-white z-50 py-4 shadow-lg'>
        <div className='flex justify-between items-center gap-4 px-4'>
          <h1 className='font-title2 text-2xl'>Find ME center</h1>
          <Link href='/' className=' '>
            Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className='py-12 min-h-screen pt-24'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='p-8 rounded-lg shadow-lg space-y-6'>
              <h3 className='text-2xl font-semibold  text-center'>
                Get in Touch
              </h3>

              {/* Form Fields */}
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='space-y-4'>
                  <div>
                    <label
                      className='block text-gray-700'
                      htmlFor='inquiryType'
                    >
                      Inquiry Type
                    </label>
                    <select
                      id='inquiryType'
                      className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:text-blue-500 transition'
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      <option value=''>Select Inquiry Type</option>
                      <option value='general'>General Inquiry</option>
                      <option value='support'>Support Request</option>
                      <option value='feedback'>Feedback</option>
                      <option value='billing'>Billing Question</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-gray-700' htmlFor='name'>
                      Name
                    </label>
                    <input
                      required
                      className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003580] transition'
                      id='name'
                      placeholder='Your Name'
                      type='text'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700' htmlFor='email'>
                      Email
                    </label>
                    <input
                      required
                      className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003580] transition'
                      id='email'
                      placeholder='Your Email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700' htmlFor='subject'>
                      Subject
                    </label>
                    <input
                      required
                      className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003580] transition'
                      id='subject'
                      placeholder='Subject'
                      type='text'
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700' htmlFor='message'>
                      Message
                    </label>
                    <textarea
                      required
                      className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003580] transition'
                      id='message'
                      placeholder='Your Message'
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='text-center'>
                    <button
                      className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-colors ${
                        isFormValid
                          ? "bg-[#003580] text-white hover:bg-[#00245d]"
                          : "bg-[#003580] text-gray-300 cursor-not-allowed"
                      }`}
                      disabled={!isFormValid}
                      type='submit'
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className='p-8 rounded-lg shadow-lg space-y-6'>
              <h3 className='text-2xl font-semibold  text-center'>
                Contact Information
              </h3>
              <div className='space-y-4'>
                <p className='text-lg text-gray-700'>
                  For any inquiries, you can reach us through:
                </p>
                <ul className='space-y-2 text-lg text-gray-700'>
                  <li>
                    <span className='font-semibold'>Phone:</span>{" "}
                    <a
                      href='tel:+1234567890'
                      className='text-[#003580] hover:underline'
                    >
                      +123 456 7890
                    </a>
                  </li>
                  <li>
                    <span className='font-semibold'>Email:</span>{" "}
                    <a
                      href='mailto:support@earthbond.com'
                      className='text-[#003580] hover:underline'
                    >
                      support@earthbond.com
                    </a>
                  </li>
                  <li>
                    <span className='font-semibold'>Address:</span>{" "}
                    <a
                      href='https://www.google.com/maps'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[#003580] hover:underline'
                    >
                      View on Map
                    </a>
                  </li>
                </ul>
                <div className='space-y-2'>
                  <p className='font-semibold'>Business Hours:</p>
                  <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
                <div>
                  <p className='font-semibold'>Follow Us:</p>
                  <div className='flex gap-4'>
                    <a
                      href='https://facebook.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[#003580] hover:underline'
                    >
                      Facebook
                    </a>
                    <a
                      href='https://twitter.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[#003580] hover:underline'
                    >
                      Twitter
                    </a>
                    <a
                      href='https://instagram.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[#003580] hover:underline'
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
