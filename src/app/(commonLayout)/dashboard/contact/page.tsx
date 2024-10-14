"use client";
import { useState } from "react";
import { toast } from "sonner";

const ContractUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      // You can also clear the form after submitting
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <>
      <section className="py-2 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-black p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-[#003580] mb-6 text-center animate__animated animate__fadeIn">
              Get in Touch
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate__animated animate__fadeIn animate__delay-1s">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    required
                    className="w-full p-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003580] transition"
                    id="name"
                    placeholder="Your Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="animate__animated animate__fadeIn animate__delay-2s">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    required
                    className="w-full p-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003580] transition"
                    id="email"
                    placeholder="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="animate__animated animate__fadeIn animate__delay-3s">
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  required
                  className="w-full p-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003580] transition"
                  id="subject"
                  placeholder="Subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="animate__animated animate__fadeIn animate__delay-4s">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  required
                  className="w-full p-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003580] transition"
                  id="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button
                  className={`px-6 py-1 font-semibold rounded-full shadow-md transition-colors ${
                    isFormValid
                      ? "bg-blue-700 text-white hover:bg-[#00245d]"
                      : "bg-blue-400 text-gray-200 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContractUs;
