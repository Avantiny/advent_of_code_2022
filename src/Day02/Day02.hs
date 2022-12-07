module Day02.Day02 where

calculateScore :: String -> Int
calculateScore "AX" = 1 + 3
calculateScore "AY" = 2 + 6
calculateScore "AZ" = 3 + 0
calculateScore "BX" = 1 + 0
calculateScore "BY" = 2 + 3
calculateScore "BZ" = 3 + 6
calculateScore "CX" = 1 + 6
calculateScore "CY" = 2 + 0
calculateScore "CZ" = 3 + 3

calculateScoreTwo :: String -> Int
calculateScoreTwo "AX" = 3 + 0
calculateScoreTwo "AY" = 1 + 3
calculateScoreTwo "AZ" = 2 + 6
calculateScoreTwo "BX" = 1 + 0
calculateScoreTwo "BY" = 2 + 3
calculateScoreTwo "BZ" = 3 + 6
calculateScoreTwo "CX" = 2 + 0
calculateScoreTwo "CY" = 3 + 3
calculateScoreTwo "CZ" = 1 + 6

dayTwo :: IO ()
dayTwo = do  
    contents <- readFile "tests/DayTwo.txt"
    print $ sum $ fmap calculateScore $ filter (/= ' ') <$> lines contents