import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatWidget from "../Component/Widget/ChatBoatWidget";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import HeroHighlight from "../Component/HeroHighlight";
import PlatformBenefits from "../Component/PlatformBenefits";

function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const dummy = [
      { id: 1, domain: "selfhelpinhindi.com", niche: "Self-Development", da: 35, price: 200 },
      { id: 2, domain: "greenthumb.blog", niche: "Gardening", da: 48, price: 45 },
      { id: 3, domain: "fitlifehub.com", niche: "Health & Fitness", da: 62, price: 75 },
    ];
    setFeatured(dummy);
  }, []);

  const steps = [
    { title: "1. Register", desc: "Create your buyer or seller account in seconds." },
    { title: "2. Explore Listings", desc: "Buyers search websites, sellers list domains." },
    { title: "3. Place Orders", desc: "Buyers submit content or request writing." },
    { title: "4. Publish & Earn", desc: "Sellers approve, publish & receive secured payments." }
  ];

  const chartData = [
    { name: 'Tech', posts: 40 },
    { name: 'Health', posts: 60 },
    { name: 'Travel', posts: 20 },
    { name: 'Finance', posts: 80 },
    { name: 'Self Dev', posts: 50 },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 text-gray-800 relative overflow-x-hidden">

     < HeroHighlight/>
      <section className="relative px-6 py-24 text-center text-white bg-gradient-to-r from-indigo-700 to-blue-600 shadow-xl">
        <h1 className="text-5xl font-bold mb-4 leading-tight">Supercharge Your SEO With Real Guest Posts</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          LinkoBack connects digital marketers & publishers with transparency, speed & trust.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/register">
            <button className="bg-white text-indigo-700 font-semibold rounded px-6 py-3 hover:bg-gray-100 transition">
              Buy Guest Posts
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-white text-indigo-700 font-semibold rounded px-6 py-3 hover:bg-gray-100 transition">
              List Your Website
            </button>
          </Link>
        </div>
      </section>

      {/* ───────────────────────── Steps */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="text-4xl font-bold text-indigo-600 mb-3">{step.title}</div>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <PlatformBenefits />

      {/* ───────────────────────── Chart */}
      <section className="px-6 py-10 bg-white max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Trending Niches</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#4f46e5" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="posts" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* ───────────────────────── Featured */}
      <section className="bg-gray-100 px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Top Featured Websites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featured.map((site) => (
            <article
              key={site.id}
              className="bg-white shadow rounded-xl p-6 flex flex-col justify-between"
            >
              <header>
                <h4 className="text-xl font-semibold mb-2 break-all">{site.domain}</h4>
                <p className="text-sm text-gray-500 mb-1">🧭 Niche: {site.niche}</p>
                <p className="text-sm text-gray-500 mb-1">📈 DA: {site.da}</p>
                <p className="text-sm text-gray-500">💵 ${site.price} / post</p>
              </header>
              <footer className="pt-4">
                <Link to={`/websites/${site.id}`}>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Benefits */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[{
            icon: "🚀", title: "SEO‑Boosting Opportunities", desc: "Access high‑authority sites across multiple niches and skyrocket your rankings."
          }, {
            icon: "🌐", title: "Real‑Time Marketplace", desc: "Instantly filter, compare & order guest posts with transparent metrics."
          }, {
            icon: "✒️", title: "Quality Content Control", desc: "Buyers control their content; sellers can approve or request edits before publishing."
          }, {
            icon: "💳", title: "Escrow‑Protected Payments", desc: "Funds are held safely until the post is live, ensuring trust for both parties."
          }].map((b, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-3xl leading-none">{b.icon}</span>
              <div>
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="text-gray-600">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Final CTA */}
      <section className="text-center px-6 py-20 bg-blue-50">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8 max-w-xl mx-auto">
          Join thousands of marketers growing their SEO and publishers earning from quality guest posts.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/register">
            <button className="bg-blue-600 text-white font-semibold rounded px-6 py-3 hover:bg-blue-700 transition">
              Start Buying
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gray-900 text-white font-semibold rounded px-6 py-3 hover:bg-gray-800 transition">
              Become a Seller
            </button>
          </Link>
        </div>
      </section>

      {/* ───────────────────────── Chat Widget */}
      <ChatWidget />

    </div>
  );
}

export default HomePage;
