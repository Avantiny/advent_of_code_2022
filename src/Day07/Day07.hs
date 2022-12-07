module Day07.Day07 where

import Test.Hspec
import Control.Monad.State

-- FAILED

main :: IO ()
main = do  
    contents <- readFile "tests/Day07.txt"
    print $ lines contents