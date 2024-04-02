
class API {
  protected _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  fetch({
    path = "",
    method = "GET",
    body,
    signal,
    headers = {"Content-Type": "application/json"},
    ...rest
  }: {
    path: string;
    method: string;
    body: any;
    signal: any;
    headers?: any;
  }) {
    return fetch(`${this._baseUrl}/${path}`, {
      method,
      signal,
      headers: {
        ...headers,
      },
      body,
      ...rest,
    }).then((response) => response.json());
  }
}

export { API };
