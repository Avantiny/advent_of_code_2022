module DayOne where
import Data.Char
import Data.List.Split
import Data.List

-- Part 1
partOneDayOne :: IO ()
partOneDayOne = do  
    contents <- readFile "tests/Day.txt"
    print $ maximum $ fmap (sum . fmap (\ d -> read d :: Int)) (splitOn [""] $ lines contents)

-- Part 2
partTwoDayOne :: IO ()
partTwoDayOne = do  
    contents <- readFile "tests/Day.txt"
    print $ sum $ take 3 $ reverse $ sort $ fmap (sum . fmap (\ d -> read d :: Int)) (splitOn [""] $ lines contents)