import status from 'http-status';

export default {
  success: (res, message, code, data) => res.status(code).json({
    status: 'success',
    message,
    code,
    data: data || [],
  }),

  error: (res, message = '', code = 500) => {
    const msg = code === 500 ? 'Internal Server Error' : message;
    return res.status(code).json({
      status: 'error',
      error: status[`${code}_NAME`],
      message: msg,
      code,
    });
  },
};
