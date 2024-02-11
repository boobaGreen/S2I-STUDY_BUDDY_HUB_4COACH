// custom hook to manage the query for a recipes list with more informations ( id it is it is necessary )

import { useQuery } from "@tanstack/react-query";
import { getAll } from "../serviceApi/apiGetAll";

export function useGetMasters(jwtToken) {
  const {
    isLoading,
    data: masters,
    error,
    refetch,
  } = useQuery({
    queryKey: ["masters"],
    queryFn: () => getAll("/masters", jwtToken),
  });

  return { isLoading, error, masters, refetch };
}
