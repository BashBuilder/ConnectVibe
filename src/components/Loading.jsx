import CircleLoader from "react-spinners/CircleLoader";
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <div className="flex fixed top-0 items-center justify-center h-[100cqh] w-screen bg-[--slate-800] z-50 opacity-90 flex-col gap-10 ">
      <CircleLoader
        color="#36d7b7"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
