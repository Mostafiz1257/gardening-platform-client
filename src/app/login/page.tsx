"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";

import { useForgetPasswordMutation } from "@/src/redux/features/user";
import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useUser } from "@/src/context/user.provider";

interface LoginDataType {
  email: string;
  password: string;
}

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [forgetPassword] = useForgetPasswordMutation(); // Forgot password mutation hook

  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [forgotEmail, setForgotEmail] = useState(""); // Forgot password email

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleForgotEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("Please enter a valid email.");

      return;
    }

    try {
      await forgetPassword({ email: forgotEmail }).unwrap();
      toast.success("Password reset link sent to your email.");
      setIsModalOpen(false); // Close modal after submitting
    } catch (error) {
      toast.error("Failed to send reset link.");
    }
  };

  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    isError,
  } = useUserLogin();

  const handleLogin = () => {
    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    handleUserLogin(data);
    setIsLoading(true);
  };

  
  useEffect(() => {
    if (isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    }

    if (isError) {
      toast.error("Login failed. Please check your credentials.");
    }
  }, [isSuccess, isError, redirect, router]);

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-5xl font-black text-center mb-8 font-title">
          Login Now!
        </h1>

        <div>
          <Input
            key={"outside"}
            label="Email"
            labelPlacement={"outside"}
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
            key={"outside"}
            label="Password"
            labelPlacement={"outside"}
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-2">
          <button
            className="text-sm flex justify-end items-end text-blue-600 hover:underline hover:cursor-pointer"
            onClick={toggleModal} // Open modal on click
          >
            Forgot password?
          </button>
        </div>
        <Button
          className="w-full mt-6 rounded-xl"
          color="primary"
          isLoading={isPending}
          size="sm"
          variant="ghost"
          onClick={handleLogin}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <div className="flex items-center my-6">
          <div className="border-t w-full" />
          <span className="mx-4 text-gray-500">or</span>
          <div className="border-t w-full" />
        </div>

        <div className="text-center">
          <p className="text-gray-700">
            Don’t have an account?{" "}
            <a
              className="text-blue-600 font-semibold hover:underline"
              href="/register"
            >
              Create one now
            </a>
          </p>
        </div>
      </div>

      {/* Modal for Forgot Password */}
      {isModalOpen && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          role="dialog"
        >
          {/* Modal Container */}
          <div className="relative bg-[#1e1e1e] p-8 rounded-xl shadow-lg w-full max-w-md transform transition-transform duration-500 ease-in-out scale-100">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Forgot Your Password?
            </h2>
            <p className="text-gray-400 text-center mb-4">
              Enter your email address and take a link to reset your password
              from your email.
            </p>

            <input
              className="w-full p-3 bg-[#2d2d2d] border border-gray-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#0070f3] transition duration-200 ease-in-out"
              placeholder="Enter your email"
              type="email"
              value={forgotEmail}
              onChange={handleForgotEmailChange}
            />

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                className="bg-[#0070f3] hover:bg-[#005bb5] text-white px-2 rounded-full transition duration-300 ease-in-out"
                color="primary"
                onClick={handleForgotPassword}
              >
                Submit
              </Button>
              <Button
                className="bg-[#333333] hover:bg-[#444444] text-white px-2 rounded-full transition duration-300 ease-in-out"
                onClick={toggleModal}
              >
                Close
              </Button>
            </div>

            {/* Close Button */}
            <button
              aria-label="Close"
              className="absolute top-3 right-3 text-white text-lg font-bold hover:text-gray-400 transition duration-300 ease-in-out"
              tabIndex={0} // Make it focusable for keyboard interaction
              onClick={toggleModal}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleModal();
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap the LoginPage component in Suspense
const WrappedLoginPage = () => (
  <Suspense fallback={<div className="flex h-screen items-center justify-center"><p>Loading...</p></div>}>
    <LoginPage />
  </Suspense>
);

export default WrappedLoginPage;
