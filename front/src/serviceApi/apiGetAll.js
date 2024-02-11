import axiosClientAuth from "./http-common";

export async function getAll(path, jwtToken) {
  const { data, error } = await axiosClientAuth.get(path, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });

  if (error) {
    console.error(error);
    throw new Error("Auth Error in validate token phase");
  }

  return data;
}
