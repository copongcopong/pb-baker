import { randomBytes } from "crypto";

function generatePassword(length = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>?";
    const bytes = randomBytes(length);
    let password = "";

    for (let i = 0; i < length; i++) {
        const index = bytes[i] % chars.length;
        password += chars[index];
    }

    return password;
}

function generateStr(length = 5, chars = "abcdefghkmnopqrstuvwxyz") {
  const bytes = randomBytes(length);
  let password = "";

  for (let i = 0; i < length; i++) {
      const index = bytes[i] % chars.length;
      password += chars[index];
  }

  return password;
}

export {generatePassword, generateStr}