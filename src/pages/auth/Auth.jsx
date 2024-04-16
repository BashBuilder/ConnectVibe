import { useAuthContext } from "../../context/authContext";
import { Login, Signup } from "../../components";

const Auth = () => {
  const { isLogin, setIsLogin } = useAuthContext();

  return (
    //the total container
    <div
      className={` relative h-[100vh] w-screen overflow-hidden before:absolute before:-top-[10%] before:right-[48%] before:z-[6] before:h-[125rem] before:w-[125rem] before:-translate-y-1/2 before:rounded-full before:bg-gradient-to-bl before:from-[#3170dd] before:to-[#327ceb] before:transition-all before:duration-2000 before:ease-in-out 
      md:min-h-[800px] md:before:-top-3/4 md:before:bottom-[68%] md:before:left-[30%] md:before:right-auto
      md:before:-translate-x-1/2 sm:before:left-1/2 
      ${
        isLogin
          ? ""
          : " before:right-[52%] before:-translate-y-1/2 before:translate-x-full md:before:-translate-x-1/2 md:before:translate-y-[70%]  "
      }
      `}
    >
      {/* the form container */}
      <div className="absolute left-0 top-0 h-full w-full ">
        {/* the signin signup form */}
        <div
          className={`  
          absolute left-3/4 top-1/2 z-[5] grid w-[50%] -translate-x-1/2 -translate-y-1/2 grid-cols-1 transition-all delay-700 duration-1000 ease-in-out md:left-1/2 md:top-[95%] md:w-screen  md:-translate-x-1/2 md:-translate-y-full md:transition-all md:delay-700 md:duration-1000 md:ease-in-out
        ${
          isLogin
            ? ""
            : " -translate-y-1/2 2xl:left-1/4 md:left-1/2 md:top-10 md:-translate-x-1/2 md:translate-y-0 "
        }
        `}
        >
          <Login />
          <Signup />
        </div>
      </div>

      {/* the panels container */}
      <div className=" absolute left-0 top-0 grid h-full w-full grid-cols-2 md:grid-cols-1 ">
        {/* md:grid-cols-1 md:grid-rows-[1fr_2fr_1fr]   */}

        {/* the left panel */}
        <div
          className={`pointer-events-auto z-[11] flex flex-col items-end justify-around pb-[2rem] pl-[12%] pr-[17%] pt-[3rem] text-center text-[--slate-100] 
        
        md:col-span-2 md:col-start-1 
        md:row-span-2 md:row-start-1 md:flex-row md:items-center md:justify-around md:px-[8%] md:py-0
        ${isLogin ? "" : " !pointer-events-none"}
        `}
        >
          <div
            className={`mx-auto text-[--slate-100] transition-transform delay-500 duration-700 ease-in-out 
          ${isLogin ? "" : " !-translate-x-[800px] md:-translate-y-[300px]  "}
          `}
          >
            <h3 className=" font-bold leading-[1] text-[--slate-100] ">
              New here?
            </h3>
            <p className=" py-[0.7rem] text-xl text-[--slate-100] ">
              Signup for an account here
            </p>
            <button
              className=" rounded-sm border-2 border-[--slate-200] bg-transparent px-4 py-2 font-bold "
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </div>
          <img
            src="./assets/log.svg"
            className={`w-full transition-transform duration-1000 ease-in-out md:w-[13rem] md:transition-transform md:delay-700 md:duration-1000 md:ease-in-out sm:hidden
            ${isLogin ? "" : " !-translate-x-[800px] md:-translate-y-[300px]"}
            `}
          />
        </div>
        {/* the right panel */}
        <div
          className={` pointer-events-none z-[12] flex flex-col items-end justify-around pb-[2rem] pl-[17%]  pr-[12%] pt-[3rem] text-center text-[--slate-100]  md:col-span-2 md:col-start-1 md:row-span-4 md:row-start-3 md:flex-row md:items-center md:justify-around md:px-[8%] md:py-[2.5rem]
          ${isLogin ? "" : " pointer-events-auto"}
          `}
        >
          <div
            className={`mx-auto translate-x-[800px] text-[--slate-100] transition-transform delay-500 duration-1000 ease-in-out md:-translate-y-[300px] md:pr-[15%] sm:px-0
             ${
               isLogin
                 ? ""
                 : " !translate-x-0 md:translate-y-[140%] sm:translate-y-44 "
             }
          `}
          >
            <h3 className=" font-bold leading-[1] text-[--slate-100] sm:text-3xl ">
              One of Us?
            </h3>
            <p className=" py-[0.7rem] text-xl text-[--slate-100] sm:py-1 ">
              Signin to your account here
            </p>
            <button
              className=" rounded-sm border-2 border-[--slate-200] bg-transparent px-4 py-2 "
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Sign in
            </button>
          </div>
          <img
            src="./assets/register.svg"
            className={`w-full translate-x-[800px] transition-transform duration-1000 ease-in-out md:w-[14rem] md:translate-y-[300px] md:transition-transform md:delay-700 md:duration-1000 md:ease-in-out sm:hidden 
            ${isLogin ? "" : " !translate-x-0 md:translate-y-[80%]"}
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
