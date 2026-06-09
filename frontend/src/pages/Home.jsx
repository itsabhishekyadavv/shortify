import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">

      {/* Glow */}

      <div className="absolute top-[-200px] left-[10%] h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[140px]" />

      <div className="absolute right-[-100px] top-[20%] h-[300px] w-[300px] rounded-full bg-white/5 blur-[120px]" />

      {/* Navbar */}

      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">

        <h1 className="text-2xl font-semibold tracking-tight">
          Shortify
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 min-h-[85vh] flex items-center relative z-10">

        <div className="max-w-4xl">

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-6xl md:text-8xl font-semibold tracking-tight leading-none"
          >
            Shorten links.
            <br />

            <span className="gradient-text">
              Beautifully.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="text-zinc-400 text-xl mt-8 max-w-2xl leading-relaxed"
          >
            Create short URLs, generate QR codes,
            track clicks and manage links —
            all inside a beautifully designed dashboard.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="flex gap-4 mt-10 flex-wrap"
          >
            <Link
              to="/register"
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="bg-white/10 border border-white/10 px-8 py-4 rounded-full text-lg hover:bg-white/20 transition"
            >
              Login
            </Link>
          </motion.div>

          {/* Stats */}

          <div className="flex flex-wrap gap-10 mt-20">

            <div>
              <h2 className="text-4xl font-semibold">
                10K+
              </h2>

              <p className="text-zinc-500">
                Links Shortened
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-semibold">
                99.9%
              </h2>

              <p className="text-zinc-500">
                Uptime
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-semibold">
                Fast
              </h2>

              <p className="text-zinc-500">
                Redirect Speed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">

        <h2 className="text-5xl font-semibold mb-14">
          Everything you need
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title:
                "Smart URL Shortening",
              desc:
                "Generate beautiful short links instantly.",
            },

            {
              title:
                "QR Code Generator",
              desc:
                "Share links anywhere using QR codes.",
            },

            {
              title:
                "Click Analytics",
              desc:
                "Track how your links perform.",
            },
          ].map(
            (
              item,
              index
            ) => (
              <motion.div
                key={
                  index
                }
                whileHover={{
                  y: -8,
                }}
                className="glass rounded-[36px] p-8"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {
                    item.title
                  }
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  {
                    item.desc
                  }
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>
    </div>
  );
}