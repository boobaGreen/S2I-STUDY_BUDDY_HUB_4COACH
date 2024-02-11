function MessageSendDx({ message, user, date }) {
  return (
    <div className="flex items-center justify-end">
      <div className="bg-[var(--color-mes-send-bg)] dark:bg-[var(--color-mes-send-bg-dark)] p-4 my-6 rounded-lg flex-1">
        <div className="flex justify-center mb-4">
          <p className="text-sm w-fit" id="author">
            {user.toUpperCase()}
          </p>
        </div>
        <div>
          <p className="text-3xl">{message}</p>
        </div>
        <div className="flex justify-end">
          <p className="text-sm w-fit mt-6" id="time">
            {new Date(date).toLocaleString("it-IT", {
              day: "numeric",
              month: "numeric",
              year: "2-digit",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="w-3 overflow-hidden ">
        <div className="text-black h-4 bg-[var(--color-mes-send-bg)] dark:bg-[var(--color-mes-send-bg-dark)] rotate-45 transform origin-top-left rounded-sm"></div>
      </div>
    </div>
  );
}

export default MessageSendDx;
