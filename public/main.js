const form = document.querySelector("form");
form.addEventListener("submit", async event => {
  event.preventDefault();
  const input = document.querySelector("input");
  const url = input.value;
  // Send the URL to your server for processing
  const response = await fetch("/create", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" }
  });
  const { shortUrl } = await response.json();
  console.log(shortUrl)
  // Display the shortened URL to the user
  alert(`Shortened URL: ${shortUrl}`);
});