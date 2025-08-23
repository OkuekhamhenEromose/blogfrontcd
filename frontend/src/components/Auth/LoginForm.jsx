// import { useState } from "react";
// import "./Auth.css";

// const LoginForm = ({ onSubmit, isSubmitting }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ email, password });
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         {/* Left Side */}
//         <div className="auth-side">
//           <div className="text">
//             <p>
//               Welcome back developer <i>- ludiflex</i>
//             </p>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="auth-right">
//           <form onSubmit={handleSubmit} className="auth-form">
//             <header>Login</header>

//             <div className="form-group">
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label>Email</label>
//             </div>

//             <div className="form-group">
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label>Password</label>
//             </div>

//             <button
//               type="submit"
//               className="btn-primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Logging in..." : "Login"}
//             </button>

//             <div className="signin">
//               <span>
//                 Don’t have an account? <a href="/register">Sign up here</a>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
