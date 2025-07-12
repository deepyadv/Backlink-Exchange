import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-10">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-4xl w-full border border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          About Us
        </h1>
        <p className="text-gray-300 text-center mb-8 text-lg">
          Learn more about our platform, why we started, and where we're heading.
        </p>

        <div className="space-y-6 text-gray-300 text-base leading-relaxed">
          <p>
            Our Guest Posting Platform was founded with one simple goal: to
            connect high-quality content creators (buyers) with website owners
            (sellers) who offer valuable publishing space. We bridge the gap
            between outreach and SEO, simplifying the guest posting process for
            everyone.
          </p>

          <p>
            We noticed that many platforms lacked trust, transparency, and user-friendly
            experiences. So, we built a secure and reliable space where users can
            register, list, or buy guest post opportunities with full confidence.
          </p>

          <p>
            Whether you're a seller looking to monetize your website or a buyer seeking
            high-quality backlinks and niche exposure, our platform is designed to help
            you achieve your goals — faster, safer, and smarter.
          </p>

          <p>
            Every seller is verified, every transaction is protected, and every listing
            is carefully curated to ensure quality and performance.
          </p>

          <p>
            We believe in empowering both content marketers and publishers through smart
            automation, transparent pricing, and ongoing support. This is just the
            beginning — we're continuously adding features to improve the guest post
            experience.
          </p>

          <p>
            Thank you for being a part of our journey. If you have questions or feedback,
            feel free to <a href="/contact" className="text-blue-400 underline hover:text-blue-300">contact us</a>.
          </p>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          Contact:{" "}
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

export default AboutUs;
