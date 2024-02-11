import axiosClientAuth from "./http-common-auth";

export async function postOne(path) {
  const { data, error } = await axiosClientAuth.get(path);

  if (error) {
    console.error(error);
    throw new Error("Auth Error in validate token phase");
  }

  return data;
}
