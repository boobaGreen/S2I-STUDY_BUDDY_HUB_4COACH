// custom hook to manage the query for a recipes list with more informations ( id it is it is necessary )

import { useQuery } from "@tanstack/react-query";
import { authGoogleVer } from "../serviceApi/apiAuthGoogle";

export function useAuth(jwtToken) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", jwtToken],
    queryFn: () => authGoogleVer(jwtToken),
  });

  return { isLoading, error, user };
}
