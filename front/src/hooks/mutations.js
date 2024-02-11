// mutations.js
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../serviceApi/http-common";

export function useLeaveGroupMutation(jwtToken, refetch) {
  return useMutation({
    mutationFn: (idGroup) => {
      return axiosClient.patch(
        `/groups/leave/${idGroup}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("success Leave the group !!!!!!!!!!!");
      refetch();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
}

export function useDeleteGroupMutation(jwtToken, refetch) {
  return useMutation({
    mutationFn: (idGroup) => {
      return axiosClient.delete(`/groups/${idGroup}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: () => {
      console.log("success Delete the group !!!!!!!!!!!");
      refetch();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
}

export function useJoinGroupMutation(jwtToken, refetch) {
  return useMutation({
    mutationFn: (idGroup) => {
      return axiosClient.patch(
        `/groups/join/${idGroup}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("success Add to a group as New participant !!!!!!!!!!!");
      refetch();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });
}
