// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { UserMinus, UserPlus } from "lucide-react";

function Friend({ friendId, name, subtitle, userPicturePath }) {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const isFriend = false;
  // const isFriend = friends.find((friend) => friend._id === friendId);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center justify-between gap-4">
        <img
          src={userPicturePath}
          className="h-14 w-14 rounded-full object-cover "
          alt={name}
        />
        <div onClick={() => navigate(`/profile/${friendId}`)}>
          <h5 className=" text-[--slate-800] hover:cursor-pointer hover:text-[--slate-600] ">
            {name}
          </h5>
          <p className="text-[--slate-500]">{subtitle}</p>
        </div>
      </div>

      <button
        onClick={() => console.log("add or remove friend")}
        className=" rounded-full bg-[--slate-100] p-2.5 "
      >
        {isFriend ? (
          <UserMinus className=" text-[slate-600] " />
        ) : (
          <UserPlus className="text-[--slate-600]" />
        )}
      </button>
    </div>
  );
}

export default Friend;
