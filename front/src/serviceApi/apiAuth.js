import axiosClientAuth from "./http-common-auth";

const path = "/users/validateToken";

export async function auth(jwtToken) {
  const { data, error } = await axiosClientAuth.get(path);
  console.log("data apiAuth", data);

  if (error) {
    console.error(error);
    throw new Error("Auth Error in validate token phase");
  }

  return data;
}
