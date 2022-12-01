module Main where

import Test.Hspec
import DayOne

main :: IO ()
main = do  
    contents <- readFile "tests/Day.txt"
    print contents