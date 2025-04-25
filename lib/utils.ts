import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  // Split the name into words by space
  const words = name.split(" ");

  // Get the first letter of the first word and the first letter of the second word
  const initials = words[0][0] + words[1][0];

  // Return the initials in uppercase
  return initials.toUpperCase();
}

export function formattedDate(rawDate: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(rawDate));
}

// const formattedDate =
