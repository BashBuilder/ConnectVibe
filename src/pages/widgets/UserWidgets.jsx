import {
  DivideCircle,
  LinkedinIcon,
  LocateIcon,
  PenLine,
  Twitter,
  User,
  Workflow,
  WorkflowIcon,
} from "lucide-react";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function UserWidgets() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <div className="rounded-md bg-[--white] px-4 pb-3 pt-6 shadow-sm ">
      <div
        className="flex items-center justify-between gap-2 pb-[1.1ren] "
        onClick={() => navigate(`/profile/useridlater`)}
      >
        {/* first row */}
        <article className="flex items-center justify-between gap-4">
          <img
            src={user?.pictureUrl}
            alt="user"
            className=" w-16 rounded-full object-cover shadow-md   "
          />
          <div>
            <h5 className=" text-xl  text-[--slate-800] hover:cursor-pointer hover:text-[--slate-500] ">
              {user?.firstName} {user?.lastName}
            </h5>
            <h6 className="text-[--slate-600]">"{user?.friends}" friend</h6>
          </div>
        </article>
        {/* <User className=" text-[--slate-500] " /> */}
      </div>
      <hr className=" m-auto mt-4 w-[90%] border-t-[1px] border-[--slate-500] " />

      {/* second row */}

      <div className=" py-4 ">
        <div className="mb-2 flex items-center gap-4">
          <LocateIcon color="var(--slate-500)" />
          <p className="text-[--slate-700] "> {user?.location} </p>
        </div>
        <div className=" flex items-center gap-4">
          <Workflow color="var(--slate-500)" />
          <p className="text-[--slate-700] "> {user?.occupation} </p>
        </div>
      </div>
      <hr className=" m-auto mt-4 w-[90%] border-t-[1px] border-[--slate-500] " />

      {/* third row */}
      <div className="py-4">
        <div className="mb-2 flex flex-col items-center justify-between gap-2">
          <div className="flex items-center justify-between">
            <h6 className="  text-[--slate-500] ">
              Who's viewed your profile{" "}
            </h6>
            <p> {user?.viewedprofile} "person" </p>
          </div>
          <div className="flex items-center justify-between">
            <h6 className=" text-[--slate-500] ">Impressions on your post</h6>
            <p> {user?.impressions} "and this person" </p>
          </div>
        </div>
        <hr className=" m-auto mt-4 w-[90%] border-t-[1px] border-[--slate-500] " />

        {/* forth row */}
        <div className="py-2 text-[--slate-700] ">
          <h4 className="mb-4 text-xl ">Social Profiles</h4>

          <div className="mb-2 flex items-center justify-between gap-4 ">
            <div className="flex w-full items-center justify-between">
              <Twitter className="" />
              <div className="w-1/2">
                <h6 className="text-[--slate-700]">Twitter</h6>
                <p>Social Network</p>
              </div>
            </div>
          </div>
          <div className="my-2 flex items-center justify-between gap-4 ">
            <div className="flex w-full items-center justify-between">
              <LinkedinIcon className="mr-4" />
              <div className="w-1/2">
                <h6 className="text-[--slate-700]">LinkedIn</h6>
                <p>Network platform </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWidgets;
