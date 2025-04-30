export const formatted = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(new Date());

export const formattedYear = new Intl.DateTimeFormat("id-ID", {
  year: "numeric",
}).format(new Date());
