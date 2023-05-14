// Return a formatted date string from a string date using Intl API.
export default function getFormattedDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date(dateString)
  );
}
