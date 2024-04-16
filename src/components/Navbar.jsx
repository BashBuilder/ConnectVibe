import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import {
  Search,
  Moon,
  Sun,
  MessageSquare,
  NutIcon,
  HelpCircleIcon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "../context/authContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { signout } = useAuthContext;
  const { darkMode, setDarkMode, screen } = useUserContext();
  const isNonMobile = screen >= 1000;
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const handleSelect = (e) => {
    e === "2" && signout();
  };

  return (
    <div className="flex items-center justify-between bg-[--white] px-[4%] py-4   ">
      <div className="flex items-center justify-between gap-5 ">
        <h3
          className=" font-bold text-[--pry] hover:cursor-pointer hover:text-[--slate-600] "
          onClick={() => navigate("/")}
        >
          Timipedia
        </h3>
        {isNonMobile && (
          <div className="flex items-center justify-between gap-2 rounded-md bg-[--slate-200] px-6  py-1  ">
            <input
              type="text"
              className="w-full bg-transparent py-2 text-[--slate-800] outline-none"
              id="navSearch"
            />
            <label htmlFor="navSearch" className="text-slate-800">
              <Search className=" text-[--slate-700] " />
            </label>
          </div>
        )}
      </div>
      {isNonMobile ? (
        <div className="flex items-center justify-around gap-6 ">
          <button className="" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? (
              <Moon className=" text-[--slate-600] " />
            ) : (
              <Sun className=" text-[--slate-600] " />
            )}
          </button>
          <button>
            <MessageSquare className=" text-[--slate-600] " />
          </button>
          <button>
            <NutIcon className=" text-[--slate-600] " />
          </button>
          <button>
            <HelpCircleIcon className=" text-[--slate-600] " />
          </button>

          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full min-w-[8rem] px-4">
              <SelectValue placeholder={user?.firstName} className=" text-xl" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">{user?.firstName} </SelectItem>
                <SelectItem value="2">Logout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsMobileMenuToggled((prev) => !prev)}>
            <Menu className=" text-[--slate-600] " />
          </button>
        </div>
      )}
      {!isNonMobile && isMobileMenuToggled && (
        <div className=" fixed bottom-0 right-0 z-10 h-full w-[12rem] bg-[--slate-100] ">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuToggled((prevState) => !prevState)}
            >
              <X className=" text-[--slate-600] " />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-12 p-2 ">
            <button className="" onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? (
                <Moon className=" text-[--slate-600] " />
              ) : (
                <Sun className=" text-[--slate-600] " />
              )}
            </button>
            <button>
              <MessageSquare className=" text-[--slate-600] " />
            </button>
            <button>
              <NutIcon className=" text-[--slate-600] " />
            </button>
            <button>
              <HelpCircleIcon className=" text-[--slate-600] " />
            </button>
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full min-w-[8rem] px-4">
                <SelectValue
                  placeholder={user?.firstName}
                  className=" text-xl"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">{user?.firstName} </SelectItem>
                  <SelectItem value="2">Logout</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
