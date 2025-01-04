class HttpCodesHelper {
  name: string;
  static OK = 200;
  static CREATED = 201;
  static BAD = 400;
  static UNATHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  static ENTITY_TOO_LARGE = 413;
  static UNSUPORTED_MEDIA_TYPE = 415;
  static SERVER_ERROR = 500;

  constructor(name: string) {
    this.name = name;
  }
}

export default HttpCodesHelper;
