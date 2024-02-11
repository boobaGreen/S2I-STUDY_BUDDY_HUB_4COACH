function OutletPrimaryTab({ children }) {
  return (
    <>
      <div className="px-2 py-4 flex flex-col justify-center items-center w-[90%] shadow-md rounded-xl bg-[var(--color-bg-tab)] dark:bg-[var(--color-bg-tab-dark)] text-[var(--color-text-tab)] dark:text-[var(--color-text-tab-dark)]">
        {children}
      </div>
    </>
  );
}

export default OutletPrimaryTab;
