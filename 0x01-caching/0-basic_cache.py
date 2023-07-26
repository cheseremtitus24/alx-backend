#!/usr/bin/python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache defines:
      - calls the base class to initialize a dictionARY
      - where data IS to be stored
    """

    def __init__(self):
        """ Initiliaze
        """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if type(key) not in [str]:
            raise Exception("Key Must Be a String")
        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key, None)
        # raise NotImplementedError("get must be implemented in your cache class")
