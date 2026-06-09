import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import toast from "react-hot-toast";

import API from "../services/api";

export default function Login() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.post(
            "/auth/login",
            form
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        toast.success(
          "Welcome back"
        );

        navigate(
          "/dashboard"
        );
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex justify-center items-center px-5 relative overflow-hidden">

      {/* Glow Effects */}

      <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-white/10 blur-[100px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="glass rounded-[40px] p-10 w-full max-w-md z-10"
      >
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-semibold gradient-text mb-3">
            Welcome
          </h1>

          <p className="text-zinc-400 text-lg">
            Sign in to continue
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-sky-400 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={
              handleChange
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-sky-400 transition"
          />

          <button className="w-full bg-white text-black rounded-2xl py-4 text-lg font-medium hover:scale-[1.02] transition">
            Login
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-8">
          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-sky-400 hover:text-sky-300 transition"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}