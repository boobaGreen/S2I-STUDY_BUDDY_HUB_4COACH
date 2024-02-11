import myGif from "../gif/account-yes.gif";
function SuccessConfirm() {
  return (
    <div className="flex justify-center flex-col">
      <div className="mt-8 p-3 rounded-md flex justify-center">
        <p className="rounded-xl w-fit p-6 bg-[var(--color-btn-bg)] dark:bg-[--color-btn-dark-bg] text-[var(--color-error)] dark:text-[var(--color-error-dark)] text-2xl">

          Account Activated successfully !!
        </p>
      </div>
      <div className="flex justify-center">
        <img src={myGif} alt="Success animations" className="object-contain" />
      </div>
    </div>
  );
}

export default SuccessConfirm;
