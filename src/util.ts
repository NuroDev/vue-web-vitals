/**
 * Prefix for all logging.
 * Helps to identify as the current module
 */
export const logPrefix: string = "[vue-web-vitals]";

/**
 * Sends provided body data to a provided url.
 *
 * Serves as an abstract/re-usable function to send the vitals
 * data to a select providers endpoint.
 *
 * @param {string} url - URL endpoint to send the POST request to
 * @param {ant} body - The body / data to submit
 */
export function send(url: string, body?: any): void {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
    return;
  }

  fetch(url, {
    body,
    credentials: "omit",
    keepalive: true,
    method: "POST",
  }).catch((err) => console.error(logPrefix, err));
}

/**
 * Calculates the connection speed using the system navigator connection
 */
export function getConnectionSpeed(): string {
  // TODO: This is pretty ugly & could do with cleaning up
  // once support for `navigator.connection` is better
  if (
    "connection" in navigator &&
    navigator["connection"] &&
    "effectiveType" in navigator["connection"]
  )
    return navigator["connection"]["effectiveType"];

  return "";
}
