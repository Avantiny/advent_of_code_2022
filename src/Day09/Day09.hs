module Day09.Day09 where

import Test.Hspec

main :: IO ()
main = do  
    contents <- readFile "tests/Day09Ex2.txt"
    print $ lines contents