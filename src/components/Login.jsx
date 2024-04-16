import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Unlock } from "lucide-react";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthContext } from "../context/authContext";

const Login = () => {
  const { setAuthCredential, isLogin, isSignin, setIsSignin, apiError } =
    useAuthContext();
  // const [isLocked, setIsLocked] = useState(true);

  const schema = z.object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(1, { message: "Enter your password" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const login = async (values) => {
    setAuthCredential(values);
    setIsSignin(true);
  };

  return (
    <form
      className={` relative z-[2] col-span-2 col-start-1 row-span-2 row-start-1 flex flex-col items-center justify-center overflow-hidden px-[5rem] transition-all delay-700 duration-200 ease-in-out sm:px-1  ${
        isLogin ? "  " : " z-[1] opacity-0 "
      } `}
      onSubmit={handleSubmit(login)}
    >
      <h1 className=" pb-2 font-bold text-[--slate-700] ">Login</h1>
      <div className="relative mb-8 mt-5 w-full max-w-[23rem] ">
        <Mail className="absolute right-4 top-0 text-[--slate-500] " />
        <input
          className=" peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent placeholder-shown:border-b-[--slate-600] focus:border-b-[#3170dd]
        "
          type="text"
          name="email"
          id="loginEmail"
          placeholder="Email"
          {...register("email")}
        />
        <label
          className="
        absolute -left-2 -top-2 scale-[.8] text-lg text-[#3170dd] transition-all  duration-200 ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd]
      "
          htmlFor="loginEmail"
        >
          Email
        </label>
        {errors.email && (
          <p className="absolute text-red-500"> {errors.email.message} </p>
        )}
      </div>
      <div className="relative mb-6 w-full max-w-[23rem]">
        <Lock className="absolute right-4 top-0 text-[--slate-500] " />
        <input
          className="peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd]"
          type="password"
          name="password"
          placeholder="Password"
          id="loginPassword"
          {...register("password")}
        />
        <label
          htmlFor="loginPassword"
          className="absolute -left-2 -top-2 scale-[.8] text-lg text-[#3170dd] transition-all  duration-200 ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd] "
        >
          Password
        </label>
        {errors.password && (
          <p className="absolute text-red-500"> {errors.password.message} </p>
        )}
        <h6 className="mt-8 cursor-pointer text-right font-bold text-[--slate-700] hover:underline ">
          Forgot password
        </h6>
      </div>

      {apiError && <p className="text-center text-red-500  "> {apiError} </p>}

      <div className="flex items-center justify-center">
        <button
          className={` mt-2 rounded-sm border-none bg-[#4481eb] px-4 py-2 text-slate-200 transition hover:bg-[#4d84e2] ${
            isSignin ? " animate-spin" : ""
          } `}
          disabled={isSignin}
        >
          Login
        </button>
      </div>
    </form>
  );
};
export default Login;
