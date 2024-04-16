import { useEffect, useState } from "react";
import PostWidget from "./postWidget";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/config";
import { useUserContext } from "../../context/userContext";

function PostsWidget() {
  const { user } = useUserContext();
  const [allPosts, setAllPosts] = useState([]);
  const [isFetch, setIsFetch] = useState(true);

  if (isFetch) {
    getDocs(collection(db, "posts")).then((snapshot) => {
      setAllPosts(snapshot.docs);
      setIsFetch(false);
    });
  }
  return (
    <div>
      {allPosts.map((post) => (
        <PostWidget
          key={post.id}
          postId={post.id}
          postUserId={post.data().postUserId}
          name={post.data().name}
          description={post.data().description}
          location={post.data().location}
          picturePath={post.data().postPicturePath}
          userPicturePath={post.data().userPicturePath}
          likes={post.data().likes}
          comments={post.data().comments}
        />
      ))}
    </div>
  );
}

export default PostsWidget;
