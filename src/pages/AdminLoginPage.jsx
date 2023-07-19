
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../authContext";
import Snackbar from "./SnackbarSecond";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
      role: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [token, setToken] = useState("");
  const [expireAt, setExpireAt] = useState(0);
  const [role, setRole] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://reacttask.mkdlabs.com/v2/api/lambda/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setToken(responseData.token);
        setExpireAt(Date.now() + 3 * 60 * 60 * 1000);
        setRole(responseData.role);
        dispatch({ type: "LOGIN_SUCCESS", payload: responseData.user_id });
        navigate("/admin/dashboard");
        setShowSnackbar(true);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error.message,
      });
      setError("password", {
        type: "manual",
        message: error.message,
      });
    }
  };

  const checkAuthorization = async () => {
    try {
      if (Date.now() < expireAt) {
        const response = await fetch(
          "https://reacttask.mkdlabs.com/v2/api/lambda/check",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ role }),
          }
        );

        if (response.ok) {
          console.log("Authorization check successful");
        } else {
          console.log("Authorization check failed");
        }
      } else {
        console.log("Token has expired");
        setToken("");
        setExpireAt(10);
        dispatch({ type: "LOGOUT" });
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
    }
  };

  useEffect(() => {
    if (token) {
      checkAuthorization();
    }
  }, [token]);

  const handleSnackbarDismiss = () => {
    setShowSnackbar(false);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="**********"
            {...register("password")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select
            {...register("role")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.role?.message ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <p className="text-red-500 text-xs italic">{errors.role?.message}</p>
        </div>

        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>

      {showSnackbar && (
        <Snackbar
          message="Logged in successfully!"
          duration={3000}
          onDismiss={handleSnackbarDismiss}
        />
      )}

<div className="text-center mt-4">
   <Link to="/"><button className="bg-blue-400 p-4">Back to Home</button></Link>
   </div>
    </div>
  );
};

export default AdminLoginPage;
