var errs = {};

errs.dbError = {
  name: 'db',
  message: 'server error',
  code: 500
};

errs.invalidType = {
  name: 'db',
  message: 'invalid type.',
  code: 500
};

errs.unsupportedSpecialCharacters = {
  name: 'db',
  message: 'Unsupported Special Character',
  code: 500
};

errs.dbNotFound = {
  name: 'db',
  message: 'not found.',
  code: 500
};

errs.dbUpdateMore = {
  name: 'db',
  message: 'more than one updated',
  code: 502
};

errs.createFailed = {
  name: 'db',
  message: 'could not create',
  code: 503
};

errs.updateFailed = {
  name: 'db',
  message: 'update failure',
  code: 504
};

errs.missingParam = {
  name: 'inputerror',
  message: 'param not found in input',
  code: 504
};

errs.alreadyHandled = {
  name: 'inputerror',
  message: 'already handled',
  code: 504
};

errs.custom = {
  name: 'custom',
  message: '',
  code: 500
};

errs.unauthorized = {
  name: 'auth',
  message: 'unauthorized',
  code: 404
};

errs.servererror = {
  name: 'server',
  message: 'server error',
  code: 404
};

errs.notFound = {
  name: 'notFoundError',
  message: 'Entry not found',
  code: 404
}

errs.notAllowed = {
  name: "NotAllowedError",
  message: "You are not Allowed to make this change.",
  code: 403
};

errs.alreadyexist = {
  name: 'alreadyexist',
  message: 'Already Exist',
  code: 505
};

errs.userBlocked = {
  name: 'userBlocked',
  message: 'user blocked',
  code: 507
};

errs.maximumRequestsReached = {
  name: 'maximumRequestsReached',
  message: 'maximum requests for the day reached',
  code: 508
};

errs.misMatch = {
  name: 'mismatch',
  message: 'server error',
  code: 504
};

errs.exceededSLA = {
  name: 'SLAError',
  message: 'This slot is already full. Please pick another slot.',
  code: 500
};

errs.realTimeBookingNotEnabled = {
  name: 'realTimeNotAllowed',
  message: 'Category not enabled for real time booking',
  code: 500
};

errs.timeConstraintNotMet = {
  name: 'minimum time limit',
  message: '',
  code: 500
};

errs.authFailureUserNotAuthorised = {
  name: 'authFailure',
  message: 'Please sign up',
  code: 401
};

errs.authFailureUserNotExist = {
  name: 'authFailure',
  message: 'Please sign up',
  code: 401
};

errs.authFailurePhoneNotVerified = {
  name: 'authFailure',
  message: 'Please verify your mobile number',
  code: 421
};

errs.authFailureLoginMethod = {
  name: 'authFailure',
  message: 'Not allowed',
  code: 401
};

errs.authFailureUserExists = {
  name: 'authFailure',
  message: 'User already registered',
  code: 401
};

errs.authFailureOtpMismatch = {
  name: 'authFailure',
  message: 'Please enter correct OTP',
  code: 401
};

errs.authFailureLoginUserNotFound = {
  name: 'authFailure',
  message: 'no user with this phone number',
  code: 421
};

errs.authFailureSignupUserExists = {
  name: 'authFailure',
  message: 'Please login to continue',
  code: 421
};

errs.authFailureClientKey = {
  name: 'authFailure',
  message: 'Not allowed',
  code: 401
};

errs.invalidParam = {
  name: 'invalidParam',
  message: '',
  code: 400
};

errs.categoryRequestsReached = {
  name: 'categoryRequestsReached',
  message : 'You cannot place a request for this service as you already have a active request for the same. Please visit your projects screen.',
  code: 508
};

errs.maximumCategoryRequestsReached = {
  name: 'maximumCategoryRequestsReached',
  message : 'Sorry you cannot place multiple same date appointments for a service.',
  code: 508
};

errs.otpLimit = {
  name: 'otplimit',
  message: 'Number of times otp requested limit reached',
  code: 504
};

errs.redisError = {
  name: 'RedisError',
  message: 'Error in redis. Please check the status',
  code: '400'
};

errs.invalidCode = {
  name: 'Invalid Code',
  message: 'Entered code is invalid',
  code: 200
};

errs.missingParamV2 = {
  name: 'InputError',
  message: 'param not found in input',
  code: 400
};

errs.pincodeError = {
  name: 'PinCodeError',
  message: 'Pin code not found for location',
  code: 400
};

errs.handledError = {
  name: 'HandledError',
  message: '',
  code: 200
};

errs.missingParamNew = {
  name: 'inputerror',
  message: 'param not found in input',
  code: 509
};

module.exports = errs;