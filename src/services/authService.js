import apiPublic from "./apiPublic";



export const requestOTP = (email) => {
  return apiPublic.post("/auth/password_request-otp/", { email });
};


export const verifyOTP = (email, otp) => {
  return apiPublic.post("/auth/password_verify-otp/", {
    email,
    otp,
  });
};


export const resetPassword = (session_token, new_password) => {
  return apiPublic.post("/auth/password_reset/", {
    session_token,
    new_password,
  });
};
