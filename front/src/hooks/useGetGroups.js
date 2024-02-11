// custom hook to manage the query for a recipes list with more informations ( id it is it is necessary )

import { useQuery } from "@tanstack/react-query";
import { getAll } from "../serviceApi/apiGetAll";

export function useGetGroups(jwtToken) {
  const {
    isLoading,
    data: groups,
    error,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getAll("/groups", jwtToken),
  });

  return { isLoading, error, groups, refetch };
}
