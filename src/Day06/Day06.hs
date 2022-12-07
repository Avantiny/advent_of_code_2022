module Day06.Day06 where

import Data.List

-- for result of task one, just replace 'numTakePartTwo' by 'numTakePartOne'
numTakePartOne = 4
numTakePartTwo = 14

findSeq :: Int -> String -> Int
findSeq n (x:xs) = if length check == length (nub check) then n else findSeq (n+1) xs
                   where check = x:take (numTakePartTwo - 1) xs

main :: IO ()
main = do  
    contents <- readFile "tests/Day06.txt"
    print $ findSeq numTakePartTwo contents