import myGif from "../gif/about.gif";
function MessageAbout({ message }) {
  return (
    <div className="flex justify-center flex-col my-2 max-w-[50%]">
      <div className="flex justify-center">
        <img src={myGif} alt="Error animations" className="object-contain" />
      </div>
      <div className="mt-8 p-3 rounded-md flex justify-center">
        <p className="rounded-xl w-fit p-6 bg-[var(--color-btn-bg)] dark:bg-[--color-btn-dark-bg] text-[var(--color-error)] dark:text-[var(--color-error-dark)] text-2xl">
          {message}
        </p>
      </div>
    </div>
  );
}

export default MessageAbout;
