import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../context/authContext";

const Signup = () => {
  const { setAuthCredential, setIsSignup, isLogin, isSignup, apiError } =
    useAuthContext();

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const signupSchema = z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email().min(1),
      occupation: z.string().min(1),
      location: z.string().min(1),
      password: z.string().min(1),
      confirmPassword: z.string().min(1),
      image: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          ".jpg, .jpeg, .png and .webp files are accepted.",
        )
        .refine(
          (files) => files?.[0]?.size <= MAX_FILE_SIZE,
          `Max file size is 1MB.`,
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const sendData = (data) => {
    setAuthCredential(data);
    setIsSignup(true);
  };

  return (
    <form
      className={` overflow-hiddenx z-[1] col-span-2 col-start-1 row-span-2 row-start-1 flex flex-col items-center justify-center gap-5 px-[5rem] py-4 opacity-0 transition-all delay-700 duration-200 ease-in-out sm:px-[2rem] ${
        isLogin ? "" : " z-[2] opacity-[1]  "
      } `}
      onSubmit={handleSubmit(sendData)}
    >
      <h1 className=" font-bold text-[--slate-700] ">SignUp </h1>
      <div className="min-w-90 flex w-full gap-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="first name"
            name="firstName"
            id="firstName"
            className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
              errors.firstName && " border-2 border-red-500 "
            } `}
            {...register("firstName")}
          />
          <label
            htmlFor="firstName"
            className=" absolute -left-2 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd] "
          >
            First Name
          </label>
        </div>
        <div className="min-w-80 relative w-full  ">
          <input
            type="text"
            placeholder="last name"
            name="lastName"
            id="lastName"
            className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none  placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
              errors.lastName && " border-2 border-red-500 "
            } `}
            autoComplete="off"
            {...register("lastName")}
          />
          <label
            htmlFor="lastName"
            className="absolute -left-2 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd]"
          >
            Last Name
          </label>
        </div>
      </div>
      <div className="min-w-80 relative w-full ">
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none  placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
            errors.email && " border-2 border-red-500 "
          } `}
          autoComplete="off"
          {...register("email")}
        />
        <label
          htmlFor="email"
          className="absolute -left-2 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd]"
        >
          Email
        </label>
      </div>
      <div className="min-w-80 relative w-full ">
        <input
          type="text"
          placeholder="occupation"
          name="occupation"
          id="occupation"
          className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none  placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
            errors.occupation && " border-2 border-red-500 "
          } `}
          autoComplete="off"
          {...register("occupation")}
        />
        <label
          htmlFor="occupation"
          className="absolute -left-3 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-3 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd] "
        >
          Occupation
        </label>
      </div>
      <div className="min-w-80 relative w-full ">
        <input
          type="text"
          placeholder="location"
          name="location"
          id="location"
          className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none  placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
            errors.location && " border-2 border-red-500 "
          } `}
          autoComplete="off"
          {...register("location")}
        />
        <label
          htmlFor="location"
          className="absolute -left-2 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd]"
        >
          Location
        </label>
      </div>
      <div className="min-w-80 relative w-full ">
        <label htmlFor="profilePic" className="my-2 text-[--slate-600]">
          Select a Profile Picture
        </label>
        <input
          type="file"
          placeholder="Profile Picture"
          name="profilePic"
          id="profilePic"
          className=" peer w-full border-[.015rem] border-dashed border-[--slate-600] bg-transparent px-2 py-2 text-[--slate-600] outline-none "
          {...register("image")}
        />
        {errors.image && (
          <p className="absolute text-sm text-red-500 ">
            {errors.image.message}
          </p>
        )}
      </div>
      <div className="min-w-80 relative w-full ">
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none  placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
            errors.password && " border-2 border-red-500 "
          }`}
          {...register("password")}
        />
        <label
          htmlFor="password"
          className="absolute -left-2 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-2 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd] "
        >
          Password
        </label>
      </div>
      <div className="min-w-80 relative w-full ">
        <input
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          id="confirmPassword"
          className={` peer mt-2 w-full border-b-[.015rem] border-b-[#3170dd] bg-transparent pt-2 leading-[1] text-[--slate-800] outline-none  placeholder:text-transparent placeholder-shown:border-b-[--slate-600] autofill:transition-colors autofill:duration-infinite focus:border-b-[#3170dd] ${
            errors.confirmPassword && " border-2 border-red-500 "
          }`}
          {...register("confirmPassword")}
        />
        <label
          htmlFor="confirmPassword"
          className="absolute -left-3 -top-2 scale-[.8] text-[#3170dd] transition-all duration-200  ease-linear peer-placeholder-shown:left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[--slate-600] peer-focus:-left-3 peer-focus:-top-2 peer-focus:scale-[.8] peer-focus:text-[#3170dd] "
        >
          Confirm Password
        </label>
      </div>
      {<p className="text-center text-red-500 "> {apiError}</p>}
      <button
        className={`m-auto rounded-sm bg-[#3170dd] px-4 py-2 text-xl text-[--slate-200]  transition-all duration-150 hover:scale-[1.2] hover:text-[--slate-200] ${
          isSignup && "animate-spin "
        } `}
        disabled={isSignup}
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
