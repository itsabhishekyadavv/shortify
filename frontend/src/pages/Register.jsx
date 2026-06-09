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

export default function Register() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
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
        await API.post(
          "/auth/register",
          form
        );

        toast.success(
          "Account created"
        );

        navigate("/");
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Registration failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex justify-center items-center px-5 relative overflow-hidden">

      <div className="absolute top-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="absolute bottom-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-white/10 blur-[100px]" />

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
            Create Account
          </h1>

          <p className="text-zinc-400 text-lg">
            Start shortening beautifully
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={
              handleChange
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-sky-400 transition"
          />

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
            Create Account
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-8">
          Already have an account?{" "}

          <Link
            to="/"
            className="text-sky-400 hover:text-sky-300 transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}