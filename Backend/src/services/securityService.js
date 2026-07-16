const dns = require("dns").promises;

const resolvesToPrivateIP = async (hostname) => {
  try {
    const results = await dns.lookup(hostname, {
      all: true,
    });

    for (const result of results) {
      const ip = result.address;

      if (
        ip.startsWith("127.") ||
        ip.startsWith("10.") ||
        ip.startsWith("192.168.") ||
        ip.startsWith("169.254.")
      ) {
        return true;
      }

      const parts = ip.split(".");

      if (parts.length === 4 && parts[0] === "172") {
        const second = Number(parts[1]);

        if (second >= 16 && second <= 31) {
          return true;
        }
      }
    }

    return false;
  } catch {
    return false;
  }
};

const isPrivateHost = (url) => {
  const hostname = new URL(url).hostname;

  // localhost names
  if (hostname === "localhost" || hostname === "::1") {
    return true;
  }

  // IPv4 checks
  if (
    hostname.startsWith("127.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("169.254.")
  ) {
    return true;
  }

  // 172.16.x.x - 172.31.x.x
  const parts = hostname.split(".");

  if (parts.length === 4 && parts[0] === "172") {
    const second = Number(parts[1]);

    if (second >= 16 && second <= 31) {
      return true;
    }
  }

  return false;
};

module.exports = {
  isPrivateHost,
  resolvesToPrivateIP,
};
