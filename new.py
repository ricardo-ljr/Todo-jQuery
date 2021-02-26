import numpy as np


def reversePrimer(prime):
    m = min(prime)
    Max = max(prime)

    prime[0] = Max
    prime[-1] = m

    return prime


prime = [11, 13, 17]

print(reversePrimer(prime))


def reverseInteger(num):
    pass


def chessBoard(chessboard):

    rows = len(chessboard)
    cols = len(chessboard[0, :])

    white = "white"
    black = "black"

    for i in range(rows):
        for j in range(cols):
            if chessboard[i, j] == 0:
                return white
            else:
                return black


chessboard = np.array([[0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [
    0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0]])
print(chessBoard(chessboard))
