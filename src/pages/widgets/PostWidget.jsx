import { useState } from "react";
import Friend from "../../components/friend";
import { Heart, HeartOff, MessageSquare, Share2 } from "lucide-react";

function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [isComments, setIsComments] = useState(false);
  const [isLiked, setIsLiked] = useState(null);
  const [likeCount, setLikeCount] = useState(50);

  return (
    // the whole post
    <section className="my-4 rounded-md bg-[--white] px-6 pb-3 pt-6 shadow-md ">
      {/* the header section which contains information about the owner of the post */}
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <h5 className="mt-4 text-xl text-[--slate-700]"> {description} </h5>
      {picturePath && (
        <img
          src={`${picturePath}`}
          alt="post"
          className=" mt-3 h-auto w-full rounded-md object-cover "
        />
      )}

      {/* the footer of the post  */}
      <div className="mt-1 flex items-center justify-between gap-8">
        <div className="mt-4 flex items-center justify-between gap-8">
          {/* The likes Section */}
          <div className="flex items-center justify-between gap-2 ">
            <button
              onClick={() => console.log("Add the like or reduce the likes")}
            >
              {isLiked ? (
                <HeartOff className=" text-[--slate-600] " />
              ) : (
                <Heart className=" text-[--slate-600] " />
              )}
            </button>
            <p> {likeCount} </p>
          </div>

          {/* the Comment section */}
          <div className="flex items-center justify-between gap-3 ">
            <button
              onClick={() =>
                console.log("A button that opens and close the comment section")
              }
            >
              <MessageSquare className=" text-[--slate-600] " />
            </button>
            <p> 24 Comments </p>
          </div>
        </div>

        {/* the share section  */}
        <button>
          <Share2 className="text-[--slate-600]" />
        </button>
      </div>
      {isComments && (
        <div className="mt-2">
          <hr className=" border-t-[1px] border-[--slate-500]" />
          <p> Map over the comment to put out the comment lists </p>
        </div>
      )}
    </section>
  );
}

export default PostWidget;
