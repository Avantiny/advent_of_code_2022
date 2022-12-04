module DayFour where

import Data.List.Split

calcMax :: [[Int]] -> Bool
calcMax [x,y] = ((fX >= fY) && (sX <= sY)) || ((fY >= fX) && (sY <= sX))
              where fX = head x
                    sX = head (tail x)
                    fY = head y
                    sY = head (tail y)

calcOverlap :: [[Int]] -> Bool
calcOverlap [x,y] = ((sX >= fY) && (sY >= fX)) || ((sY >= fX) && (sX >= fY))
              where fX = head x
                    sX = head (tail x)
                    fY = head y
                    sY = head (tail y)

dayFour :: ([[Int]] -> Bool) -> IO ()
dayFour f = do  
    contents <- readFile "tests/DayFour.txt"
    print $ length $ filter id $
      fmap f $ fmap (fmap (\ e -> read e :: Int)) <$>
        fmap (fmap (splitOn "-") . splitOn ",") (lines contents)