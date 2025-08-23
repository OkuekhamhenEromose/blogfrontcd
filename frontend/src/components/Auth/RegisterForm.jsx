// import { useState } from "react";
// import "./Auth.css";

// const RegisterForm = ({ onSubmit, isSubmitting }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//     role: "user",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         {/* Left Side */}
//         <div className="auth-side">
//           <div className="text">
//             <p>
//               Join the community of developers <i>- ludiflex</i>
//             </p>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="auth-right">
//           <form onSubmit={handleSubmit} className="auth-form">
//             <header>Create Account</header>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 minLength="3"
//               />
//               <label>Username</label>
//             </div>

//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Email</label>
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//               />
//               <label>First Name</label>
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//               />
//               <label>Last Name</label>
//             </div>

//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 minLength="6"
//               />
//               <label>Password</label>
//             </div>

//             <div className="form-group">
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//               <label>Role</label>
//             </div>

//             <button
//               type="submit"
//               className="btn-primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Registering..." : "Register"}
//             </button>

//             <div className="signin">
//               <span>
//                 Already have an account? <a href="/login">Log in here</a>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
