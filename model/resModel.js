/* eslint-disable max-classes-per-file */

class BaseModel {
  constructor(data, message) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    } else if (typeof data === 'string') {
      this.message = data;
      this.data = null;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
