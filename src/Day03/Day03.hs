module Day03.Day03 where

import Data.List
import Data.List.Split

myMap = zip ['a'..'z'] [1..] ++ zip ['A' .. 'Z'] [27 ..]

partOneDayThree :: IO ()
partOneDayThree = do  
    contents <- readFile "tests/DayThree.txt"
    print $ sum $ 
     fmap snd $ 
     concatMap (\c -> filter (\d -> fst d == head c) myMap) $ 
     fmap (nub . uncurry intersect) (\str -> splitAt (div (length str) 2) str) <$> lines contents


partTwoDayThree :: IO ()
partTwoDayThree = do  
    contents <- readFile "tests/DayThree.txt"
    print $ sum (snd <$>
     concatMap
       (\ c -> filter (\ d -> fst d == head c) myMap)
       (nub
          <$>
            fmap
              (\ c
                 -> head c `intersect` head (tail c)
                      `intersect` head (tail (tail c)))
              (chunksOf 3 (lines contents))))