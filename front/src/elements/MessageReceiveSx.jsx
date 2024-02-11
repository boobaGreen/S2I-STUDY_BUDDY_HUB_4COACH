function MessageReceiveSx({ message, user, date }) {
  return (
    <div className="flex items-center justify-start">
      <div className="w-3 overflow-hidden">
        <div className="h-4 bg-[var(--color-mes-receive-bg)] dark:bg-[var(--color-mes-receive-bg-dark)] rotate-45 transform origin-bottom-right rounded-sm"></div>
      </div>
      <div className="bg-[var(--color-mes-receive-bg)] dark:bg-[var(--color-mes-receive-bg-dark)] p-4 my-6 rounded-lg flex-1">
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
    </div>
  );
}

export default MessageReceiveSx;
