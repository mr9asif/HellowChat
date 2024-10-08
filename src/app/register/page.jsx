"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Regester = () => {
   const router = useRouter()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit =async (data) => {
    console.log("Form data: ", data);
  
    try {
      const response = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.Email,
          username: data.Username, // 'username' is more commonly lowercase in APIs
          password: data.Password
        })
      });
   
      if (response.status === 201) {
        console.log("User created");
        toast.success("User successfully created!")
         router.push('/login')
      }else if(response.status === 402){
         toast.error("User Already Exist")
      } else {
        console.log("User failed to create");
      }
    } catch (error) {
      console.log("Internal error", error); // Optionally, log the error for more details
    }
    
  
  };
 const handleToast = () =>{
    toast.success('click success')
 }
   
  return (
    <div className="flex justify-center items-center min-h-screen bg-[oxF6F4F3]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/Logo.png" width={70} height={70} alt="LOGO" />
          <h1 className="text-2xl pt-6 font-bold mb-6 text-orange-500 text-center">
            Hello Chat
          </h1>
        </div>
        <div>
        <button onClick={handleToast}>Make me</button>
       </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            {...register("Username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters",
              },
            })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Show username errors */}
          {errors.Username && (
            <span className="text-red-500 text-sm">
              {errors.Username.message}
            </span>
          )}

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
            {...register("Password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message:
                  "Password must contain at least one uppercase letter, one number, and one special character",
              },
            })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Show password errors */}
          {errors.Password && (
            <span className="text-red-500 text-sm">
              {errors.Password.message}
            </span>
          )}

          {/* Submit button */}
          <input
            type="submit"
            value="Register"
            className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 cursor-pointer transition duration-300"
          />
        </form>

        <p className="my-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold cursor-pointer text-xl">
            Login
          </Link>
        </p>
        </div>
        
       
     
    </div>
    
  );
};

export default Regester;
