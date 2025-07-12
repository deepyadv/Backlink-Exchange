import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Star, ThumbsUp } from "lucide-react";

function HeroHighlight() {
  const stats = [
    {
      icon: <TrendingUp size={28} className="text-green-500" />,
      number: "105k+",
      label: "Unique Websites",
      sub: "+15k last month",
    },
    {
      icon: <Star size={28} className="text-yellow-500" />,
      number: "45k+",
      label: "Customer Reviews",
      sub: "+10k last month",
    },
    {
      icon: <ThumbsUp size={28} className="text-blue-500" />,
      number: "99.9%",
      label: "Positive Feedback",
      sub: "Platform trust rating",
    },
  ];

  return (
    <section className="relative bg-white px-6 py-20 md:py-28 overflow-hidden text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Side */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-indigo-600">DA40+</span> Guest Posting <br /> Service Made Easy
          </h1>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>SEO, PR Distribution & Link Building Marketplace</li>
            <li>100% Verified Publishers</li>
            <li>Turn your content into revenue</li>
          </ul>
          <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition">
            Sign Up for Free
          </button>
        </motion.div>

        {/* Right Stats Cards */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i }}
            >
              <div className="flex items-center gap-3 mb-2">{item.icon}<span className="text-sm text-green-600">{item.sub}</span></div>
              <h3 className="text-3xl font-bold">{item.number}</h3>
              <p className="text-gray-600 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroHighlight;
