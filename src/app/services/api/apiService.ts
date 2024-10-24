import axios, { AxiosInstance } from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        "Access-Control-Allow-Origin": "*",
      },
      //   validateStatus: function (status: number) {
      //     return (
      //       status === 404 ||
      //       status === 200 ||
      //       status === 201 ||
      //       status === 101 ||
      //       status === 400 ||
      //       status < 200
      //     );
      //   },
    });
  }

  public get instance() {
    return this.axiosInstance;
  }
}

export default new ApiService().instance;
