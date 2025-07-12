import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4 py-12 ">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Choose Your Role
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Tell us how you'd like to use the platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buyer Card */}
          <div
            onClick={() => navigate("/all-websites")}
            className="cursor-pointer bg-white shadow-md rounded-xl p-8 border hover:shadow-lg hover:border-indigo-500 transition"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Buyer</h2>
            <p className="text-gray-600 mb-4">
              Search, filter, and order high-quality guest posts to boost your SEO.
            </p>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition">
              Continue as Buyer
            </button>
          </div>

          {/* Seller Card */}
          <div
            onClick={() => navigate("/website-listing")}
            className="cursor-pointer bg-white shadow-md rounded-xl p-8 border hover:shadow-lg hover:border-green-500 transition"
          >
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Seller</h2>
            <p className="text-gray-600 mb-4">
              List your website and earn from guest post orders securely.
            </p>
            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
              Continue as Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
