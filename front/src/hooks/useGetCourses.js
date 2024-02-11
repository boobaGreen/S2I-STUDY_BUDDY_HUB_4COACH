// custom hook to manage the query for a recipes list with more informations ( id it is it is necessary )

import { useQuery } from "@tanstack/react-query";
import { getAll } from "../serviceApi/apiGetAll";

export function useGetCourses(jwtToken) {
  const {
    isLoading,
    data: courses,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getAll("/courses", jwtToken),
  });

  return { isLoading, error, courses, refetch };
}
