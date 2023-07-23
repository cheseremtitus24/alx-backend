#!/usr/bin/env python3
"""
Module shows a possible use case of pagination on the contents
of a csv file
"""
import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def index_range(self, page: int, page_size: int) -> Tuple[int, int]:
        """

        :param page:  page number
        :type page: integer
        :param page_size: limit of the number of items to retrieve
        :type page_size: int
        :return: tuple of upper and lower bound
        :rtype: tuple
        """
        end: int = page * page_size
        start: int = end - page_size
        return (start, end)

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves the Contents of an Indexed Page
        :param page: Page number to retrieve data from
        :type page: integer
        :param page_size: Limit to the contents of page to retrieve
        :type page_size: integer
        :return: a List of contents within a page
        :rtype: List of List
        """
        if type(page) not in [int]:
            raise AssertionError()
        if type(page_size) not in [int]:
            raise AssertionError()
        if page < 0 or page_size < 0:
            raise AssertionError()
        if page == 0 or page_size == 0:
            raise AssertionError()
        # populate __dataset with data
        self.dataset()
        start, end = self.index_range(page, page_size)
        return self.__dataset[start:end]
