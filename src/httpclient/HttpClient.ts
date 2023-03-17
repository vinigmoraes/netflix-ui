import axios, { Method } from "axios";

export enum RequestMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}

export class HttpClient {
  private headers = { "Content-Type": "application/json"};
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async sendRequest(method: RequestMethod,url: string,jsonBody?: string): Promise<any> {
    const response = await axios({
      method: method,
      url: this.baseUrl + url,
      headers: this.headers,
      data: JSON.stringify(jsonBody)
    })
      .then(function (response) {
        console.log(`Request: ${url} executed successfully`, response.data);
        return response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Error Status Code:", error.response.status);
          throw new Error("Error to send Request!");
        }
      });
      return response
  }
}
