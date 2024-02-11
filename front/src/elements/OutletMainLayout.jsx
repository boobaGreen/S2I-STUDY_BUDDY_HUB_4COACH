function OutletMainLayout({ children }) {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col pt-12 p-2 lg:p-8 xl:p-12 items-center">
        {children}
      </div>
    </>
  );
}
export default OutletMainLayout;
