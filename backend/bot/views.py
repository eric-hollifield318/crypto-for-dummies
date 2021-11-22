# from django.shortcuts import render

# Create your views here.
import threading

from django.http import HttpResponse
from django.views import View

from .binance_bot import binance_trade_bot

class BotView(View):
    def get(self, request):
        bot_thread_name = "crypto_for_dummies_bot_thread"
        action_to_take = request.GET.get('action')

        if action_to_take == "start":
            bot_thread = StoppableThread(target=binance_trade_bot.run_trader, name=bot_thread_name)
            bot_thread.start()
            return HttpResponse("Bot started!")
        elif action_to_take == "stop":
            self.find_and_stop_thread(bot_thread_name)
            return HttpResponse("Bot stopped!")

        return HttpResponse("Did nothing")

    def find_and_stop_thread(self, thread_name):
        all_threads = threading.enumerate()
        for thread in all_threads:
            if thread.name == thread_name:
                thread.stop()
                thread.join()

class StoppableThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""

    def __init__(self, *args, **kwargs):
        super(StoppableThread, self).__init__(*args, **kwargs)
        self._stop_event = threading.Event()

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()