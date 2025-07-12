import React from 'react';
import { ShieldCheck, Users, PenLine, ThumbsUp, TrendingUp, CheckCircle, MessageSquare, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const benefits = [
  {
    icon: <Users size={32} />, title: "50k+ Verified Publishers",
    desc: "Work with real website owners across all niches with verified traffic data."
  },
  {
    icon: <TrendingUp size={32} />, title: "SEO Metrics Included",
    desc: "Check Domain Authority, Traffic, Spam Score, and Backlink Profiles."
  },
  {
    icon: <ShieldCheck size={32} />, title: "Trusted by Buyers",
    desc: "Buyers choose from thousands of niche sites with real-time transparency."
  },
  {
    icon: <MessageSquare size={32} />, title: "Feedback Shapes Listings",
    desc: "Your reviews help improve listing quality and seller trust scores."
  },
  {
    icon: <PenLine size={32} />, title: "Content Writing Options",
    desc: "Choose to write your own or request high-quality, SEO-optimized content."
  },
  {
    icon: <Layers size={32} />, title: "Full Control Over Orders",
    desc: "Approve/reject submissions, track delivery time, and manage payouts."
  },
  {
    icon: <CheckCircle size={32} />, title: "Quality Post Approval",
    desc: "Manual review system ensures every post meets platform quality standards."
  },
  {
    icon: <ThumbsUp size={32} />, title: "Secure Payments",
    desc: "Funds are held in escrow until the post goes live. Total buyer protection."
  },
];

function PlatformBenefits() {
  return (
    <section className="px-6 py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What You Get with LinkoBack Guest Posting Platform
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const delay = index * 0.2;
            const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

            return (
              <motion.div
                ref={ref}
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center"
              >
                <div className="text-indigo-600 mb-3 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/register">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition">
              Sign Up for Free
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PlatformBenefits;
