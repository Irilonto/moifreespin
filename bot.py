import logging
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

API_TOKEN = "7192031740:AAHaOaGa9eRfOUFNA2kG7POt7Qv2jNa-EHs"

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

# === Команда /start ===
@dp.message(Command("start"))
async def start(message: types.Message):
    keyboard = types.InlineKeyboardMarkup(
        inline_keyboard=[
            [
                types.InlineKeyboardButton(
                    text="🎰 Запустить рулетку",
                    web_app=types.WebAppInfo(url="https://ТВОЙ-САЙТ/index.html")
                )
            ]
        ]
    )

    await message.answer(
        "Привет 👋\nЗапускай рулетку и выигрывай призы!",
        reply_markup=keyboard
    )

# === Приём данных от WebApp ===
@dp.message()
async def webapp_data_handler(message: types.Message):
    if message.web_app_data:
        prize = message.web_app_data.data
        await message.answer(f"🎉 Тебе выпало: {prize}")

# === Запуск ===
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
