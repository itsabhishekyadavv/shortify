import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

export default function Navbar() {
  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (
    <motion.div
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Shortify
        </h1>

        <button
          onClick={logout}
          className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}