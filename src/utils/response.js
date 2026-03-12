export const successResponse = (res, message, data, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res,
  message,
  stack_trace = null,
  status = 400,
) => {
  return res.status(status).json({
    success: false,
    message,
    stack_trace,
  });
};
