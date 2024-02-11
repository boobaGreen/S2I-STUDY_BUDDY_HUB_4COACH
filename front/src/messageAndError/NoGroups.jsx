import { useNavigate } from "react-router-dom";
import myGif from "../gif/berretto-uni.gif";

function NoGroups() {
  const navigate = useNavigate();
  const goToGroups = () => navigate("/groups");
  return (
    <div className="flex justify-center flex-col">
      <div className="mt-8 mb-12 p-3 rounded-md flex justify-center">
        <p
          onClick={goToGroups}
          className="cursor-pointer rounded-xl w-fit p-6 bg-[var(--color-btn-bg)] dark:bg-[--color-btn-dark-bg] text-[var(--color-error)] dark:text-[var(--color-error-dark)] text-2xl"
        >
          Start create or join Groups !!
        </p>
      </div>
      <div className="flex justify-center">
        <img src={myGif} alt="Success animations" className="object-contain" />
      </div>
    </div>
  );
}

export default NoGroups;
