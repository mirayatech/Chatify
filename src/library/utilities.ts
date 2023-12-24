import dayjs from "dayjs";

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const formatter = dayjs(date);
  const now = new Date();

  if (dayjs().isSame(formatter, "date")) return formatter.format("h:mm A");

  if (dayjs().isSame(formatter, "week")) return formatter.format("ddd h:mm A");

  if (now.getFullYear() === date.getFullYear())
    return formatter.format("MMM DD h:mm A");

  return formatter.format("DD MMM YYYY h:mm A");
};

// Convert size in bytes to a human-readable format
// Source: https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
export const formatFileSize = (size: number) => {
  const sizeIndex = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, sizeIndex)).toFixed(1)} ${
    ["B", "KB", "MB", "GB", "TB"][sizeIndex]
  }`;
};

export const formatFileName = (name: string) => {
  const nameParts = name.split(".");

  const fileExtension = nameParts.slice(-1)[0];
  const baseName = nameParts.slice(0, -1).join(".");

  const toKebabCase = (str: string) =>
    str
      .normalize("NFD") // Normalize the base name
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/đ/g, "d") // Replace special characters
      .replace(/Đ/g, "D")
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\s\-]/g, "") // Remove remaining non-word characters
      .trim() // Remove leading and trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .toLowerCase(); // Convert to lowercase

  return `${Date.now()}-${toKebabCase(baseName)}.${fileExtension}`; // Append the file extension
};

export const splitLinkFromMessage = (message: string) => {
  const URL_REGEX =
    // eslint-disable-next-line no-useless-escape
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;

  const result = message.split(" ").reduce((acc, item) => {
    const isURL = URL_REGEX.test(item);
    if (isURL) acc.push({ link: item });
    else {
      if (typeof acc.slice(-1)[0] === "string") {
        acc = [...acc.slice(0, -1), `${acc.slice(-1)[0]} ${item}`];
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, [] as ({ link: string } | string)[]);

  return result;
};
