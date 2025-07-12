import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-700">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Have questions or suggestions? We’d love to hear from you.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-200 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="mt-1 w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="mt-1 w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Or reach out directly:{" "}
          <a
            href="mailto:deepakyadav9636@gmail.com"
            className="text-blue-400 hover:underline"
          >
            deepakyadav9636@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
