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
      'x-auth-key': `${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
      'x-auth-user': `${process.env.NEXT_PUBLIC_ACCESS_NAME}`,
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
    }).then(async (response) => {
      return await response.json();
    });
  }
}

export { API };
