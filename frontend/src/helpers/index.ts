import {SERVER_URL} from "../constant";

const defaultRequestOptions = {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
};

export const request = async (url: RequestInfo | URL, requestOptions: RequestInit = defaultRequestOptions) => {
  try {
    const data = await fetch(`${SERVER_URL}${url}`, requestOptions);
    return data.json();
  } catch (e) {
    console.log(e, "✅ => e");
    return e;
  }
}