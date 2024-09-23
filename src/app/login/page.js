"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form data: ", data);

    try {
      const res = await signIn("credentials", {
        email: data.Email, // Extract email from data
        password: data.Password, // Extract password from data
        redirect: false,
      });

      if (res?.ok) {
        console.log("Login successful");
        console.log(res)
         toast.success("Login Successfully!")
        router.push('/')
      } else {
        console.log("Invalid credentials");
        toast.error("Invalid Email or Password")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[oxF6F4F3]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/Logo.png" width={70} height={70} alt="LOGO" />
          <h1 className="text-2xl pt-6 font-bold mb-6 text-orange-500 text-center">Hello Chat</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            {...register("Email", { required: "Email is required" })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Show email errors */}
          {errors.Email && (
            <span className="text-red-500 text-sm">{errors.Email.message}</span>
          )}

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            {...register("Password", { required: "Password is required" })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Show password errors */}
          {errors.Password && (
            <span className="text-red-500 text-sm">{errors.Password.message}</span>
          )}

          {/* Submit button */}
          <input
            type="submit"
            value="Login"
            className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 cursor-pointer transition duration-300"
          />
        </form>
        <p className="my-6">Don't have an account? <Link href='/register' className="font-bold cursor-pointer text-xl">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
