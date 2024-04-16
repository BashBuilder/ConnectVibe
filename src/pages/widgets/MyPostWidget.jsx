import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import Dropzone from "react-dropzone";
import {
  AxeIcon,
  ClipboardPaste,
  DeleteIcon,
  File,
  FileAudio,
  Image,
} from "lucide-react";
import { auth, db, storage } from "../auth/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function MyPostWidget() {
  const { setNewPost } = useUserContext();
  const { user, screen } = useUserContext();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const isNonMobile = screen >= 1000;
  const [post, setPost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageName = uuidv4();

    const postImageRef = ref(storage, `post/${imageName}+${image.name}`);
    uploadBytes(postImageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            const postRef = collection(db, "posts");
            addDoc(postRef, {
              postUserId: user.id,
              name: `${user.firstName}, ${user.lastName}`,
              description: post,
              location: user.location,
              postPicturePath: url,
              userPicturePath: user.pictureUrl,
              likes: [],
              comments: [],
              createdAt: serverTimestamp(),
            }).catch(error, console.log("addDoc error", error.message));
            setImage(null);
            setIsImage(false);
            setPost("");
            setNewPost(true);
          })
          .catch((error) => console.log("getDownloadUrl error", error.message));
      })
      .catch((error) => console.log("uploadbyte error", error.message));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" rounded-md bg-[--white] px-6 pb-3 pt-6 shadow-md "
    >
      <div className="mb-4 flex items-center justify-between gap-6">
        <img
          src={user?.pictureUrl}
          alt="user"
          className="boject-cover h-16 w-16 rounded-full"
        />
        <input
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          placeholder="Whats on your mind"
          className="w-full rounded-md bg-[--slate-100] px-8 py-4 outline-none "
        />
      </div>
      <hr className=" m-auto mb-4 w-[90%] border-t-[1px] border-[--slate-500] " />

      <div className="flex items-center justify-between">
        {isImage && (
          <div className=" mb-4 w-full rounded-sm border-[1px] border-[--slate-500] p-2  ">
            <Dropzone
              acceptedFiles=".jpg, .jpeg, .png"
              multiple={true}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex items-center justify-between">
                  <div
                    {...getRootProps()}
                    className=" w-full  border-[1px] border-dashed border-[--slate-400] p-2 hover:cursor-pointer "
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p> {image.name} </p>
                      </div>
                    )}
                  </div>
                  {image && (
                    <button onClick={() => setImage(null)} className="ml-4">
                      <DeleteIcon className="text-[--slate-500]" />
                    </button>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        )}
      </div>

      {/* the lower panel with icons and what you want to do  */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-between gap-1"
          onClick={() => setIsImage((prevState) => !prevState)}
        >
          <Image className=" text-[--slate-500] " />
          <p className="  hover:cursor-pointer hover:text-[--slate-400] ">
            Image
          </p>
        </div>

        {isNonMobile ? (
          <>
            <div className="flex items-center justify-between gap-1">
              <ClipboardPaste className="text-[--slate-500] hover:cursor-pointer" />
              <p>Clip</p>
            </div>

            <div className="flex items-center justify-between gap-1">
              <File className="text-[--slate-500] hover:cursor-pointer" />
              <p>Attachment</p>
            </div>

            <div className="flex items-center justify-between gap-1">
              <FileAudio className="text-[--slate-500] hover:cursor-pointer" />
              <p> Audio </p>
            </div>
          </>
        ) : (
          <div className="ites-center flex justify-between">
            <AxeIcon className="text-[ --slate-500 ]" />
          </div>
        )}
        <button className=" rounded-md bg-[--pry] px-4 py-2 text-white hover:opacity-90 ">
          {" "}
          Post
        </button>
      </div>
    </form>
  );
}

export default MyPostWidget;
