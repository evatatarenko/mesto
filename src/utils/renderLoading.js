export default function renderLoading(isLoading, button, message) {
  let text;
  if (isLoading) text = "Сохранение...";
  if (!isLoading) text = "Сохранить";

  if (message) text = message;

  button.textContent = text;
}
