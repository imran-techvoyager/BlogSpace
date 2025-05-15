import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-950 shadow-md">
        <div className="text-2xl font-bold text-blue-400">BlogSpace</div>
        <ul className="flex gap-6 text-lg">
          <li className="hover:text-blue-400 cursor-pointer transition">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            <Link to={"/signup"}>Register</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to BlogSpace</h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8">
          BlogSpace is your personal platform to share ideas and discover inspiring stories.
          Log in to explore a vibrant community of bloggers, read articles from around the world,
          and publish your own blogs to express yourself.
        </p>
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition"
        >
          Sign Up Now
        </Link>
      </main>

      {/* Optional Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BlogSpace. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
