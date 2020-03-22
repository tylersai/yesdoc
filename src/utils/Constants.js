export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getDefaultEmp = () => {
  return {
    memberId: "",
    name: "",
    address: "",
    dateOfBirth: "",
    employerName: "",
    credits: 0.0
  };
};
