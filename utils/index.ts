/**
 * Debounce a function call, ensuring it only executes after a specified delay
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}

/**
 * Converts total minutes into a formatted string like "1h 43m" or "45m"
 * @param minutes - Total number of minutes to format
 * @return A string representing the time in hours and minutes
 */
export function formatMinutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

// Formats a number into USD currency format like "$15,000,000"
export function formatToUSD(number: number) {
  if (!number || isNaN(number) || number === 0) {
    return "N/A";
  }
  return `$${number.toLocaleString("en-US")}`;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  const match = cookies.find((c) => c.startsWith(`${name}=`));
  return match ? match.split("=")[1] : null;
}

export function logOut() {
  const LOGOUT_COOKIES = ["session_id", "username", "avatar_path"];
  LOGOUT_COOKIES.forEach(
    (name) =>
      (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`)
  );
  window.location.replace("/");
}
