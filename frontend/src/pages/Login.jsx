// import React, { useState } from "react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase/Firebase";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const verifyAndRedirect = async (userEmail) => {
//     if (!userEmail.endsWith(".du.ac.in")) {
//       toast.error("Only .du.ac.in emails allowed");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/verify-email", { email: userEmail });

//       if (res.data.success) {
//         toast.success("Login successful");

//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("role", res.data.role);

//         // Redirect by role
//         switch (res.data.role) {
//           case "admin":
//             navigate("/admin/dashboard");
//             break;
//           case "faculty":
//             navigate("/faculty/dashboard");
//             break;
//           case "student":
//             navigate("/student/dashboard");
//             break;
//           default:
//             toast.error("Invalid role");
//         }
//       } else {
//         toast.error("Email not found in the database");
//       }
//     } catch (error) {
//       toast.error("Login failed");
//       console.error(error);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const userEmail = result.user.email;
//       await verifyAndRedirect(userEmail);
//     } catch (error) {
//       toast.error("Google Login failed");
//     }
//   };

//   const handleEmailLogin = async () => {
//     if (!email) return toast.error("Enter your email");
//     await verifyAndRedirect(email);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login to Smart College</h2>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-200"
//         >
//           Sign in with Google
//         </button>

//         <div className="flex items-center my-6">
//           <div className="border-t w-full"></div>
//           <span className="px-3 text-gray-500 text-sm">OR</span>
//           <div className="border-t w-full"></div>
//         </div>

//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Enter DU email"
//           className="w-full border rounded px-4 py-2 mb-3"
//         />
//         <button
//           onClick={handleEmailLogin}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
//         >
//           Continue with Email
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase/Firebase";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const verifyAndRedirect = async (userEmail) => {
//     if (!userEmail.endsWith(".du.ac.in")) {
//       toast.error("Only .du.ac.in emails allowed ❌");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/verify-email", { email: userEmail });

//       if (res.data.success) {
//         toast.success("Login successful 🎉");

//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("role", res.data.role);

//         switch (res.data.role) {
//           case "admin":
//             navigate("/admin/dashboard");
//             break;
//           case "faculty":
//             navigate("/faculty/dashboard");
//             break;
//           case "student":
//             navigate("/student/dashboard");
//             break;
//           default:
//             toast.error("Invalid role");
//         }
//       } else {
//         toast.error("Email not found in the database ❗");
//       }
//     } catch (error) {
//       toast.error("Login failed 💥");
//       console.error(error);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const userEmail = result.user.email;
//       await verifyAndRedirect(userEmail);
//     } catch (error) {
//       toast.error("Google Login failed ❌");
//     }
//   };

//   const handleEmailLogin = async () => {
//     if (!email) return toast.error("Enter your email");
//     await verifyAndRedirect(email);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-white"
//       >
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold tracking-wide">🚀 Smart College Login</h2>
//           <p className="text-sm text-white/80 mt-1">Only for .du.ac.in emails</p>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm shadow-inner hover:scale-[1.02]"
//         >
//           <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
//           Sign in with Google
//         </button>

//         <div className="flex items-center my-6">
//           <div className="border-t border-white/30 w-full"></div>
//           <span className="px-3 text-white/60 text-xs">OR</span>
//           <div className="border-t border-white/30 w-full"></div>
//         </div>

//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Enter DU email"
//           className="w-full bg-white/20 backdrop-blur-sm placeholder-white/60 text-white px-4 py-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-white/40 transition-all"
//         />

//         <button
//           onClick={handleEmailLogin}
//           className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 py-3 rounded-xl font-semibold shadow-xl hover:scale-[1.02] transition-all"
//         >
//           Continue with Email
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/Firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const verifyAndRedirect = async (userEmail) => {
    if (!userEmail.endsWith(".du.ac.in")) {
      toast.error("Only .du.ac.in emails allowed");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-email", { email: userEmail });

      if (res.data.success) {
        toast.success("Login successful 🎓");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        switch (res.data.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "faculty":
            navigate("/faculty/dashboard");
            break;
          case "student":
            navigate("/student/dashboard");
            break;
          default:
            toast.error("Invalid role");
        }
      } else {
        toast.error("Email not found in the database");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      await verifyAndRedirect(userEmail);
    } catch (error) {
      toast.error("Google Login failed");
    }
  };

  const handleEmailLogin = async () => {
    if (!email) return toast.error("Enter your email");
    await verifyAndRedirect(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f5f7fa] via-[#c3cfe2] to-[#e2ebf0] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-6">
          <img src="" alt="" className="w-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Welcome to MarkX&gt;</h1>
          <p className="text-sm text-gray-600">Smart College Management System</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition duration-300"
        >
          <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="flex items-center my-6 text-gray-500 text-sm">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your DU email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-4"
        />
        <button
          onClick={handleEmailLogin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition duration-300"
        >
          Continue with Email
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          🔒 Only authorized .du.ac.in users allowed.
        </p>
        <p className="text-center text-[11px] text-gray-400 mt-2">
          🚀 Built for next-gen universities — SCMS Platform ©2025
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
