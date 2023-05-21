import Link from "next/link";
import { useState, useEffect } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Make signup fetch request
  useEffect(() => {
    fetch('/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then((data) => data.json())
    .then((parsed) => {
      
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <div className="flex justify-center">
      <h1 className="text-4xl font-bold">Signup</h1>
    </div>
  )
}

export default Signup;