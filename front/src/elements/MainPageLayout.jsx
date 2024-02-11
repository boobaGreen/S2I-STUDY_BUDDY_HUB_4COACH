function MainPageLayout({ children }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col py-12 justify-center items-center bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {children}
      </div>
    </>
  );
}

export default MainPageLayout;
