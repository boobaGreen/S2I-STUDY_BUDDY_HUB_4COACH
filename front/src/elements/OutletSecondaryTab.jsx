function OutletSecondaryTab({ children }) {
  return (
    <>
      <div className="mt-12 px-2 py-4 flex flex-col shadow-md rounded-lg bg-[var(--color-bg-tab)] dark:bg-[var(--color-bg-tab-dark)] text-[var(--color-text-tab)] dark:text-[var(--color-text-tab-dark)]">
        {children}
      </div>
    </>
  );
}

export default OutletSecondaryTab;
