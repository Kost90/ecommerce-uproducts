class API {
  protected _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  fetch({
    path = '',
    method = 'GET',
    body,
    signal,
    headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'x-auth-key': `${process.env.NEXT_API_KEY}`,
      'x-auth-user': `${process.env.NEXT_API_NAME}`,
    },
    cache = 'no-store',
    ...rest
  }: {
    path: string;
    method?: string;
    body?: any;
    signal: any;
    cache?: any;
    headers?: any;
  }) {
    return fetch(`${this._baseUrl}/${path}`, {
      method,
      signal,
      headers: {
        ...headers,
      },
      body,
      cache,
      ...rest,
    }).then((response) => response.json());
  }
}

export { API };
