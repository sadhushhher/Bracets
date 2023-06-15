const responseGenerator = (status, data) => {
  return {
    status,
    success: status === 200,
    data
  }
};

export { responseGenerator }
