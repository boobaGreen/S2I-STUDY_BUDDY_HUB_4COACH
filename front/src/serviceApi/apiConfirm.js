import axiosClientAuth from "./http-common-auth";

const URL = "/users/confirmAccount/";

export async function confirm(mailToken) {
  const finalUrl = URL + mailToken;

  const { data, error } = await axiosClientAuth.get(finalUrl);

  if (error) {
    console.error(error);
    throw new Error("Auth Error in validate token phase");
  }

  return data;
}
