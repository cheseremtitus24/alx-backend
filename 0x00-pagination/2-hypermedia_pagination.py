#!/usr/bin/env python3
"""
Adds HATEOS to Pagination with linking to Prev,next page
as well as total_pages
"""
import csv
import math
from typing import List, Tuple, Union, Any, Dict


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

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        method that takes the same arguments (and defaults)
        as get_page and returns a dictionary containing  key-value pairs:
        :param page:
        :type page:
        :param page_size:
        :type page_size:
        :return: Dictionary
        :rtype: dict
        """
        page_size: int = page_size
        page: int = page
        data: List[List] = self.get_page(page=page, page_size=page_size)
        total_pages: int = math.ceil(len(self.__dataset) / page_size)
        prev_page: Union[int, any] = (page - 1) if (page - 1) >= 1 else None
        next_page: Union[int, any] = (
            page + 1) if (page + 1) <= total_pages else None
        return ({
            'page_size': page_size,
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages,
        })
