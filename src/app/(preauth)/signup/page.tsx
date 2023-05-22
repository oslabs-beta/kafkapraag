"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // // Make login fetch request to check if already logged in
  // useEffect(() => {
  //   fetch('/api/login', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({username, password})
  //   })
  //   .then((data) => data.json())
  //   .then((parsed) => {
      
  //   })
  //   .catch((err) => console.log(err));
  // }, [])

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold ">Signup <span className="font-light">for</span> <br className="md:hidden"/>kafkaPRAAG</h1>
          <p className="py-6">Your Apache Kafka health and performance visualzer.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="text" placeholder="password" className="input input-bordered" />
              <label className="label">
                <p className="text-sm">Have an account? <span><Link href="/login" className="label-text-alt link link-hover text-sm">Click here to login.</Link></span></p>
              </label>
            </div>
            <div className="form-control mt-6">
              <Link href="/metrics" className="btn btn-primary">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;