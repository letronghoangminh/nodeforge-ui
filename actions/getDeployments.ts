import { ApiClient } from "@/lib/axios-jwt-common";

export default async function UseGetDeployment() {
  const axiosInstance = ApiClient();
  const url = "/api/deployment";

  const response = await axiosInstance.get(url);
  console.log("response", response);
  return response?.data || [];
}
