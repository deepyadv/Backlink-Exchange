import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        
        <div>
          <h2 className="text-xl font-bold text-white mb-2">GuestLink</h2>
          <p className="text-sm leading-relaxed">
            The smart way to buy & sell guest posts. Trusted by marketers, loved by publishers.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Marketplace</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/register" className="hover:text-white">Buy Guest Posts</Link></li>
            <li><Link to="/register" className="hover:text-white">List Your Website</Link></li>
            <li><Link to="/faqs" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about-us " className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-white">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Stay Connected</h3>
          <p className="text-sm">Follow us on:</p>
          <ul className="mt-2 space-y-1 text-sm underline">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      
      <div className="text-center text-sm text-gray-500 mt-10 border-t pt-4 border-gray-700">
        © {new Date().getFullYear()} LinkoBack. All rights reserved.
      </div>
    </footer>
  );
}
