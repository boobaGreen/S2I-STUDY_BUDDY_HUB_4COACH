// custom hook to manage the query for a recipes list with more informations ( id it is it is necessary )

import { useQuery } from "@tanstack/react-query";
import { getAll } from "../serviceApi/apiGetAll";

export function useGetSchools(jwtToken) {
  const {
    isLoading,
    data: schools,
    error,
    refetch,
  } = useQuery({
    queryKey: ["schools"],
    queryFn: () => getAll("/schools", jwtToken),
  });

  return { isLoading, error, schools, refetch };
}
