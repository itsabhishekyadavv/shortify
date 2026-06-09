import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import toast from "react-hot-toast";

import {
  QRCodeCanvas,
} from "qrcode.react";

import {
  CopyToClipboard,
} from "react-copy-to-clipboard";

import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Dashboard() {
  const navigate =
    useNavigate();

  const [url, setUrl] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [urls, setUrls] =
    useState([]);

  const fetchUrls =
    async () => {
      try {
        const res =
          await API.get(
            "/url/my-urls"
          );

        setUrls(
          res.data.urls
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      navigate("/");
    }

    fetchUrls();
  }, []);

  const shortenUrl =
    async () => {
      if (!url) {
        return toast.error(
          "Enter a URL"
        );
      }

      try {
        setLoading(
          true
        );

        await API.post(
          "/url/shorten",
          {
            originalUrl:
              url,
          }
        );

        toast.success(
          "URL Shortened"
        );

        setUrl("");

        fetchUrls();
      } catch (
        error
      ) {
        toast.error(
          "Something went wrong"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  const totalClicks =
    urls.reduce(
      (
        total,
        item
      ) =>
        total +
        item.clicks,
      0
    );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >
          <h1 className="text-5xl font-semibold tracking-tight gradient-text">
            URL Dashboard
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Shorten and manage your links beautifully.
          </p>
        </motion.div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {[
            {
              title:
                "Total URLs",
              value:
                urls.length,
            },
            {
              title:
                "Total Clicks",
              value:
                totalClicks,
            },
            {
              title:
                "Active Links",
              value:
                urls.length,
            },
          ].map(
            (
              stat,
              index
            ) => (
              <motion.div
                key={
                  index
                }
                whileHover={{
                  scale:
                    1.03,
                }}
                className="glass rounded-[32px] p-7"
              >
                <p className="text-zinc-400">
                  {
                    stat.title
                  }
                </p>

                <h2 className="text-5xl font-semibold mt-3">
                  {
                    stat.value
                  }
                </h2>
              </motion.div>
            )
          )}
        </div>

        {/* URL Input */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="glass rounded-[36px] p-8 mb-10"
        >
          <h2 className="text-3xl font-semibold mb-6">
            Create Short Link
          </h2>

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Paste your URL..."
              value={url}
              onChange={(e) =>
                setUrl(
                  e.target
                    .value
                )
              }
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none text-white placeholder:text-zinc-500"
            />

            <button
              onClick={
                shortenUrl
              }
              className="bg-white text-black px-8 py-5 rounded-2xl font-medium hover:scale-105 transition"
            >
              {loading
                ? "Creating..."
                : "Shorten"}
            </button>
          </div>
        </motion.div>

        {/* URL Cards */}

        <div className="space-y-6">

          {urls.length ===
          0 ? (
            <div className="glass rounded-[36px] p-20 text-center">

              <h2 className="text-2xl font-medium text-zinc-300">
                No URLs Yet
              </h2>

              <p className="text-zinc-500 mt-3">
                Create your first short link.
              </p>
            </div>
          ) : (
            urls.map(
              (
                item,
                index
              ) => (
                <motion.div
                  key={
                    item._id
                  }
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.08,
                  }}
                  whileHover={{
                    scale:
                      1.01,
                  }}
                  className="glass rounded-[36px] p-7 flex flex-col lg:flex-row justify-between gap-8"
                >
                  <div className="flex-1 overflow-hidden">

                    <p className="text-zinc-300 text-sm uppercase tracking-widest mb-3">
                      Original URL
                    </p>

                    <p className="text-white text-lg break-all">
                      {
                        item.originalUrl
                      }
                    </p>

                    <p className="text-zinc-300 text-sm uppercase tracking-widest mt-8 mb-3">
                      Short URL
                    </p>

                    <a
                      href={
                        item.shortUrl
                      }
                      target="_blank"
                      className="text-sky-400 text-lg break-all hover:underline"
                    >
                      {
                        item.shortUrl
                      }
                    </a>

                    <div className="mt-8 inline-flex bg-white/10 rounded-full px-5 py-2">
                      <span className="text-zinc-300">
                        {item.clicks}
                        {" "}
                        Clicks
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-5">

                    <div className="bg-white rounded-[28px] p-4">
                      <QRCodeCanvas
                        value={
                          item.shortUrl
                        }
                        size={
                          110
                        }
                      />
                    </div>

                    <CopyToClipboard
                      text={
                        item.shortUrl
                      }
                      onCopy={() =>
                        toast.success(
                          "Copied"
                        )
                      }
                    >
                      <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                        Copy Link
                      </button>
                    </CopyToClipboard>
                  </div>
                </motion.div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}