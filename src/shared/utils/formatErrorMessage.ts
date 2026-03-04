const formatErrorMessage = (rawMessage: string) => {
  const separatorIndex = rawMessage.indexOf(':');

  if (separatorIndex === -1) {
    return rawMessage.trim();
  }

  return rawMessage.slice(separatorIndex + 1).trim();
};

export default formatErrorMessage;
