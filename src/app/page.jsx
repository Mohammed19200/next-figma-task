"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import "./LoginMediaQuery.css";
import { PiShoppingBag } from "react-icons/pi";
import { CiLock } from "react-icons/ci";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="hero-section col-12">
      {/* circle */}
      <div className="div-circle-TopRight"></div>
      <div className="div-circle-BottomRight"></div>
      <div className="div-circle-BottomLeft"></div>
      <div className="div-circle-TopLeft"></div>

      {/* Section 1 */}
      <section className="form-section col-12 col-md-11 col-lg-4 col-xl-4">
        {/* {error && <p className="text-danger">{error}</p>} */}

        <h1>Welcome back</h1>
        <p>
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        <form onSubmit={handleLogin} className="form-style" action="">
          <div className="input-group">
            <span className="input-group-text">
              <PiShoppingBag />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <span className="input-group-text">
              <CiLock />
            </span>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            disabled={!email || !password || !isValidEmail(email)}
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

          <p className="text-center mt-3 text-signup">
            Don't have an account? <span>Sign up</span>
          </p>
        </form>
      </section>

      {/* Section 2 */}
      <section className=" col-12 col-md-11 col-lg-6 col-xl-7 images-container">
        <div className="image-section col-12"></div>
        <img className="logo-title" src="/logo.png" alt="logo-title" />
      </section>
    </main>
  );
}
