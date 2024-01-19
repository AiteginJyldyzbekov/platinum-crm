export default function handler() {
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString(); // Преобразуем в строку в формате ISO

  // Выводим запись в консоль с текущим временем
  console.log(`Cron job executed at: ${formattedTime}`);

  // Возвращаем сообщение в виде строки
  return `Cron job executed at: ${formattedTime}`;
}