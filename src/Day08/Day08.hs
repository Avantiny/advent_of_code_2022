module Main where

import Test.Hspec
import Data.List
import Control.Monad.State

-- The problem here is with creating one more array then necessary in getVisibleMatrix functions
-- This is handled in an ugly way by dropping it using 'init' on lines 71 and 72 -> this should be refactored!
-- A part of this problem is "guard" on line 35 and it is cause by not checking the cases properly in getVisibleMatrix

-- When a tree is encountered, take take should stop but tree should be included
-- https://stackoverflow.com/a/22472610/17361388

takeWhileInclusive :: (a -> Bool) -> [a] -> [a]
takeWhileInclusive _ [] = []
takeWhileInclusive p (x:xs) = x : if p x then takeWhileInclusive p xs
                                         else []

-- @example [[a,b,c][d,e]] 1 f -> [[a,b,c][d,e,f]]
addToAcc :: [[a]] -> Int -> a -> [[a]]
addToAcc acc line p = zipWith (\x i -> if i == line then x ++ [p] else x) acc [0..]

-- index -> arr -> isVisible
isVisible1 :: Int -> [Int] -> Bool
isVisible1 n x | null start || null end = True
              | num > maximum start || num > maximum end = True
              | (num == maximum start && num > maximum end) || (num == maximum end && num > maximum start) = True
              | otherwise = False
               where num = x !! n
                     start = take n x
                     end = drop (n+1) x

isVisible2 :: Int -> [Int] -> Int
isVisible2 n x = length startArrVisible * length endArrVisible
               where num = if n < length x then x !! n else 0
                     start = take n x
                     end = drop (n+1) x
                     endArrVisible = takeWhileInclusive (< num) end
                     startArrVisible = takeWhileInclusive (< num) $ reverse start

-- (ind1, ind2) -> sourceMatrix -> interResult -> result
getVisibleMatrix1 :: (Int, Int) -> [[Int]] -> [[Bool]] -> [[Bool]]
getVisibleMatrix1 (n, m) x acc | n < nSize = getVisibleMatrix1 (n+1,m) x (addToAcc acc m visibleVal)
                               | n == nSize = if m + 1 > mSize then acc else getVisibleMatrix1 (1,m+1) x (acc ++ [[visibleVal]])
                        where nSize = length x
                              mSize = length (transpose x)
                              visibleVal = isVisible1 n currLine
                              currLine = x !! m

getVisibleMatrix2 :: (Int, Int) -> [[Int]] -> [[Int]] -> [[Int]]
getVisibleMatrix2 (n, m) x acc | m == mSize = acc
                               | n < nSize = getVisibleMatrix2 (n+1,m) x (addToAcc acc m visibleVal)
                               | n == nSize = getVisibleMatrix2 (1,m+1) x (acc ++ [[visibleVal]])
                        where nSize = length x
                              mSize = length (transpose x)
                              visibleVal = isVisible2 n currLine
                              currLine = x !! m

mergeMatrices1 :: [[Bool]] -> [[Bool]] -> [[Bool]]
mergeMatrices1 = zipWith (zipWith (||))

mergeMatrices2 :: [[Int]] -> [[Int]] -> [[Int]]
mergeMatrices2 = zipWith (zipWith (*))


main :: IO ()
main = do  
    contents <- readFile "tests/Day08.txt"
    let trees = fmap (fmap (\ d -> read [d] :: Int)) (lines contents)

    let horMatrix1 = init $ getVisibleMatrix1 (0,0) trees [[]]
    let verMatrix1 = init $ getVisibleMatrix1 (0,0) (transpose trees) [[]]
    let merged1 = mergeMatrices1 horMatrix1 (transpose verMatrix1)
    let result1 = length (filter id $ concat merged1)

    let horMatrix2 = init $ getVisibleMatrix2 (0,0) trees [[]]
    let verMatrix2 = init $ getVisibleMatrix2 (0,0) (transpose trees) [[]]
    let merged2 = mergeMatrices2 horMatrix2 (transpose verMatrix2)
    let result2 = maximum (concat merged2)

    print (result1, result2)