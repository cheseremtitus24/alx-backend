#!/usr/bin/python3
""" LRU Caching """
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ Class that inherits from BaseCaching and is a caching system """

    def __init__(self):
        super().__init__()
        self.head, self.tail = '-', '='
        self.nxt, self.prev = {}, {}
        self.handle(self.head, self.tail)

    def handle(self, head, tail):
        """ Handle elements """
        self.nxt[head], self.prev[tail] = tail, head

    def _remove(self, key):
        """ Remove element """
        self.handle(self.prev[key], self.nxt[key])
        del self.prev[key], self.nxt[key], self.cache_data[key]

    def _add(self, key, item):
        """ LRU algorithm, add element """
        self.cache_data[key] = item
        self.handle(self.prev[self.tail], key)
        self.handle(key, self.tail)
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            print(f"DISCARD: {self.nxt[self.head]}")
            self._remove(self.nxt[self.head])

    def put(self, key, item):
        """ Assign to the dictionary """
        if key and item:
            if key in self.cache_data:
                self._remove(key)
            self._add(key, item)

    def get(self, key):
        """ Return the value linked """
        if key is None or self.cache_data.get(key) is None:
            return None
        if key in self.cache_data:
            value = self.cache_data[key]
            self._remove(key)
            self._add(key, value)
            return value
