import { useQuery } from "@tanstack/react-query";
import { confirm } from "../serviceApi/apiConfirm";

export function useConfirmAccount(tokenMail) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["confirmAccount", tokenMail],
    queryFn: () => confirm(tokenMail),
  });

  return { isLoading, error, data };
}
