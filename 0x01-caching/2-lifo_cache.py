#!/usr/bin/python3
""" LIFOCache module
"""
from base_caching import BaseCaching
from itertools import cycle


class LIFOCache(BaseCaching):
    """ BasicCache defines:
      - calls the base class to initialize a dictionARY
      - where data IS to be stored
    """

    def __init__(self):
        """ Initiliaze and use a cycle for top two inserted dictionary
        key:value pairs
        """
        super().__init__()
        self.index = cycle(range(1, 3))

    def put(self, key, item):
        """ Add an item in the cache
        """
        if type(key) not in [str] or item is None:
            return
        # Check if cache is full and if so discard first item
        if len(self.cache_data) >= self.MAX_ITEMS:
            key_list = list(self.cache_data.keys())
            current_discard_index = next(self.index) * -1
            # Check if key is the same if it is skip pop
            if key_list[current_discard_index] != key:
                self.cache_data.pop(key_list[current_discard_index])
                print("DISCARD:", key_list[current_discard_index])
            else:
                #
                for _ in range(1):
                    current_discard_index = next(self.index) * -1

        # Insert new dictionary item.
        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key, None)
