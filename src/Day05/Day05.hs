module AOC.Day05 where

import Test.Hspec
import DayOne

import Control.Monad.State 

import Data.List.Split

stacksToReverse :: [String]
stacksToReverse = ["VNFSMPHJ", "QDJMLRS", "BWSCHDQN", "LCSR", "BFPTVM", "CNQRT", "RVG", "RLDPSZC", "FBPGVJSD"]

moveCrates :: [Int] -> [String]
moveCrates [n,from,to] = [""]

main :: IO ()
main = do  
    contents <- readFile "tests/DayFiveCrop.txt"
    print $ fmap (fmap (\ d -> read d :: Int) . splitOn ",") (lines contents)