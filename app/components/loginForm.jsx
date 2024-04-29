"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function loginForm() {
  const [loading, setLoading] = useState(false);
  const [formD, setFormD] = useState();
  const notify = (value) => toast(value);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormD((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response.ok) {
      notify("user signed in");
      setTimeout(() => {
        router.push("/");
      }, 200);
    }
    else {
      notify("Signed in failed! please try again");
      setFormD({email: "", password: ""});
      setLoading(false)

    }
  };
  return (
    <div className="loginForm">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          className="mb-2 rounded-md border-1 border-gray-600"
          type="email"
          name="email"
          id="Email"
          placeholder="Email"
          value={formD?.email}
          onChange={handleInputChange}
          required
        />
        <input
          className=" mb-2 rounded-md border-1 border-gray-600"
          type="password"
          name="password"
          id="Password"
          placeholder="Password"
          value={formD?.password}
          onChange={handleInputChange}
          required
        />
        <button
          className={`bg-blue-500 ${loading ? "" : "hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
          type="submit" disabled={loading ? true : false}
        >
          {loading ? "loading" : "submit"}
        </button>
      </form>
    </div>
  );
}
