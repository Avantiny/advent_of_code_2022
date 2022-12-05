module Main where

import Test.Hspec

main :: IO ()
main = do  
    contents <- readFile "tests/Day.txt"
    print contents