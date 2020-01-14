export const API_ENDPOINT = "http://172.20.10.3:5000";

export const getDefaultEmp = () => {
  return {
    memberId: "",
    name: "",
    address: "",
    dateOfBirth: new Date(),
    employerName: "Yes Doc",
    credits: 0.0
  };
};
