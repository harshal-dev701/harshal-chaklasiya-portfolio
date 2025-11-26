export default async function sendContactEmail({ name, email, message }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage =
      errorBody?.error || `Failed to send contact email (status ${response.status})`;
    throw new Error(errorMessage);
  }

  return response.json();
}


