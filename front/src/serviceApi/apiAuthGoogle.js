import axiosClientAuth from "./http-common";

const path = "/users/validateToken";

export async function authGoogleVer(jwtToken) {
  const { data, error } = await axiosClientAuth.get(path, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  console.log("data apiAuth google ver", data);

  if (error) {
    console.error(error);
    throw new Error("Auth Google Error in validate token phase");
  }

  return data;
}
