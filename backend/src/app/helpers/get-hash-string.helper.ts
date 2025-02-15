import { createHash } from 'crypto';

export const getHashStringHelper = (value: string) => {
  const hash = createHash('sha256');
  hash.update(value);

  return hash.digest('hex').substring(0, 32);
};

export const getHashStringGenerateOnDate = (value: string) =>
  getHashStringHelper(value + new Date().getTime());
