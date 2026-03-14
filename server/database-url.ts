function splitConnectionString(connectionString: string): {
  protocol: string;
  username: string;
  password: string;
  hostAndPath: string;
} {
  const protocolSeparatorIndex = connectionString.indexOf("://");
  if (protocolSeparatorIndex === -1) {
    throw new Error("DATABASE_URL must include a protocol, such as postgresql://");
  }

  const protocol = connectionString.slice(0, protocolSeparatorIndex);
  const remainder = connectionString.slice(protocolSeparatorIndex + 3);
  const atIndex = remainder.lastIndexOf("@");
  if (atIndex === -1) {
    return {
      protocol,
      username: "",
      password: "",
      hostAndPath: remainder,
    };
  }

  const userInfo = remainder.slice(0, atIndex);
  const hostAndPath = remainder.slice(atIndex + 1);
  const colonIndex = userInfo.indexOf(":");

  if (colonIndex === -1) {
    return {
      protocol,
      username: userInfo,
      password: "",
      hostAndPath,
    };
  }

  return {
    protocol,
    username: userInfo.slice(0, colonIndex),
    password: userInfo.slice(colonIndex + 1),
    hostAndPath,
  };
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeDatabaseUrl(connectionString: string): string {
  const trimmedValue = connectionString.trim();
  const { protocol, username, password, hostAndPath } = splitConnectionString(trimmedValue);

  if (!username) {
    return trimmedValue;
  }

  const encodedUsername = encodeURIComponent(safeDecodeURIComponent(username));
  const encodedPassword = password
    ? encodeURIComponent(safeDecodeURIComponent(password))
    : "";
  const credentials = encodedPassword
    ? `${encodedUsername}:${encodedPassword}`
    : encodedUsername;

  return `${protocol}://${credentials}@${hostAndPath}`;
}

export function getDatabaseUrl(): string {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
  }

  return normalizeDatabaseUrl(process.env.DATABASE_URL);
}