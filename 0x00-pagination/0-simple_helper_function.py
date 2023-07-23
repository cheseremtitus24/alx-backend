"""Sets the upper and Lower bound of limit and offset
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
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
