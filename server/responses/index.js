'use strict';

var response;

function responseBody( res, data, statusCode, logType, apiDeprecated ) {
  var responseObj = {
    isError: false,
    success: {
      data: data,
      message: 'Successfully Done!!'
    }
  };

  statusCode = statusCode || 200;
  var extra = {
    'logType': logType,
    'statusCode': statusCode,
    'apiDeprecate': apiDeprecated
  };

  return responseObj;

}

response = {

  successResponse: function successResponse(res, data, statusCode, logType, apiDeprecated) {
    statusCode = statusCode || 200;
    var responseObj = responseBody( res, data, statusCode, logType, apiDeprecated );
    if(res.addToCache)
      res.addToCache(data);
    return res.status(statusCode).json(responseObj);
  },

  successCachedResponse: function successCachedResponse(res, data, statusCode, logType, apiDeprecated) {
    var responseObj = responseBody( res, data, statusCode, logType, apiDeprecated );
    return res.status(statusCode).json(responseObj);
  },

  // fromHandleError: use case
  // since handledResponse also calling errorResponse function this
  //causes duplication of error log on EFK

  errorResponse: function errorResponse(res, err, statusCode, message, fromHandleError) {
    // isSilent can be used on Client to not show error to user
    var isSilent = false;
    if (message && message.isSilent) {
      isSilent = message.isSilent;
      delete message.isSilent;
    }
    var responseObj = {
      isError: true,
      error: message || err.message,
      success: message || err.message,
      error_obj: {
        error_message: message && message.message ? message.message : 'something went wrong!',
        is_silent: isSilent,
        status_code: statusCode || 200
      }
    };
    if (!err || typeof(err)!='object') err = {};
    if (!fromHandleError) {
      if (message) {
        err.message = err.message || message.message || null;
      } else {
        err.message = err.message || null;
      }
    }
    statusCode = statusCode || 200;
    var extra = {
      'statusCode': statusCode
    };
    return res.status(statusCode).json(responseObj);
  },

  handleError: function handleError(res, err, apiDeprecated) {
    var error = {};
    var code;
    error.isSilent = err.isSilent || false;
    error.err = err;
    error.stack = (err && err.stack) ? err.stack : new Error().stack;

    if ( !err ) {
      error.message = 'null error';
      code = 422;
    }
    else if(err.err_message) {
      if(err.err_type && err.err_type.includes('grpc')) {
        error.message = 'Something went wrong. Please contact Urbanclap helpline.'
      }
      else {
        error.message = err.err_message;
      }
      if(err.old_version) {
        code = 500;
      }
      else {
        code = 200;
      }

    }
    else if ( err.name ) {

      //moongoose error, mail us
      error.message = 'System Err';
      code = 433;
    }
    else if ( err.code ) {
      if( err.code instanceof Object ) {

        //our custom error
        var message = '';
        if( !err.field ){
          err.field = '';
        }
        if (err.code.message == '') {
          if (err.field != '') message = err.field;
        } else {
          if (err.field != '') message = err.field + " " + err.code.message;
          else message = err.code.message;
        }
        error.message = message;
        error.name = err.code.name || '';
        code = err.code.code;
      }
      else {
        error.message = "unclassified error";
        code = 500;
      }

    }
    else {

      //time to add something new
      error.message = 'unhandled error';
      code = 455;
    }
    if (code) error.code = code;
    console.log('\x1b[36m The error is :: ', error, '\x1b[0m');

    return response.errorResponse( res, '', code, error, true );
  },

  createError: function createError(errorMessage, statusCode) {
    return { code: { code: statusCode || 500, message: errorMessage || 'Something Went Wrong!' } };
  }

};

module.exports = response;
