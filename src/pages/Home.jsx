import Navbar from "../components/Navbar";
import { useUserContext } from "../context/userContext";
import AdvertWidgets from "./widgets/AdvertWidgets";
import MyPostWidget from "./widgets/MyPostWidget";
import PostsWidget from "./widgets/PostsWidget";
import UserWidgets from "./widgets/userWidgets";

function Home() {
  const { screen } = useUserContext();
  const isNonMobile = screen >= 1000;

  return (
    <main>
      <Navbar />
      <div
        className={`w-full px-[6%] py-8 ${
          isNonMobile ? "flex" : "block"
        } : justify-between   `}
      >
        <section className={`${isNonMobile ? " basis-[27%]" : ""} `}>
          <UserWidgets />
        </section>

        <section className={`${isNonMobile ? " basis-[42%] " : "mt-8"} `}>
          <MyPostWidget />
          <PostsWidget />
        </section>

        {isNonMobile && (
          <section className="basis-[26%]">
            <AdvertWidgets />
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;
