const responseCodes = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': "I'm a Teapot",
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '444': 'Missing Headers',
  '445': 'Missing Required Body Fields',
  '424': 'Failed Dependency',
  '425': 'Unordered Collection',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required'
};

module.exports = {
  success: (res, code, data) => {
    if (res === null || res === undefined) {
      throw console.error(
        'res object is null inside reponseController success function');
    }
    if (code === null || code === undefined) {
      code = 200;
    }
    if (typeof data === 'string') {
      res.status(code).json({
        status: responseCodes[code],
        message: data
      })
    } else {
      res.status(code).json({
        status: responseCodes[code],
        data: data
      })
    }

  },
  fail: (res, code, data) => {
    if (res === null || res === undefined) {
      throw console.error(
        'res object is null inside reponseController fail function');
    }

    var statusCode = null;
    var errorResponseData = {};

    if (code === 406) {
      console.log("===== data ======");

      console.log(data);
      console.log("======");


      const error = data.errors[0];
      const type = error.type || "unknown";
      const path = error.path || "unknown";
      const value = error.value || "unknown";
      if (type === "unique violation") {
        errorResponseData = {
          code: code,
          status: responseCodes[code],
          message: value + " needs to be a unique " + path +
            ". Please try another value for " + path,
        }
      } else if (type === "Validation error") {
        errorResponseData = {
          code: code,
          status: responseCodes[code],
          message: value + " is not a valid " + path +
            ". Please make sure the value is a valid " + path
        }
      } else if (type === "notNull Violation") {
        statusCode = 422;
        errorResponseData = {
          code: statusCode,
          status: responseCodes[statusCode],
          message: path +
            " is a required field and cannot be null. Please make sure to include " +
            path + " in the request body"
        }
      } else {
        statusCode = 400;
        errorResponseData = {
          code: statusCode,
          status: responseCodes[statusCode],
          message: "Some unknow sequelize error has occurred. Please check data object for more detail",
          data: error
        }
      }
    } else {
      if (typeof data === 'string') {
        errorResponseData = {
          code: code,
          status: responseCodes[code],
          message: data
        }
      } else {
        errorResponseData = {
          code: code,
          status: responseCodes[code],
          data: data
        }
      }

    }

    res.status(statusCode || code).json(errorResponseData)
  }
}
