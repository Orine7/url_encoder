import { randomBytes, scryptSync } from 'crypto';

export const validatePassword = (
  suppliedPassword: string,
  storedPassword: string,
): boolean => {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buf = scryptSync(suppliedPassword, salt, 64);
  return buf.toString('hex') === hashedPassword;
};

export const encryptPassword = (password: string): string => {
  const salt = randomBytes(8).toString('hex');
  const buf = scryptSync(password, salt, 64);

  return `${buf.toString('hex')}.${salt}`;
};

export const isPassEncrypted = (password?: string) => {
  const parts = password?.split('.');
  if (!password) return false;
  return (
    parts.length === 2 && parts[0].length === 128 && parts[1].length === 16
  );
};
