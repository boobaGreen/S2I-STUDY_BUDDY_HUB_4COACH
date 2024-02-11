import { DarkModeProvider } from "./contexts/DarkModeContext";
import { MainProvider } from "./contexts/MainContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RouterCustom from "./RouterCustom";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <DarkModeProvider>
      <MainProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterCustom />
        </QueryClientProvider>
      </MainProvider>
    </DarkModeProvider>
  );
}

export default App;
