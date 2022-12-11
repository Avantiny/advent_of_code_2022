module Day05.Day05 where

import Test.Hspec
import Data.List.Split
import qualified Control.Monad.State.Lazy as S

type Instruction = [Int] -- number of items, from stack index, to stack index

type Stack = [Char]
type StackList = [Stack]

-- executeStep :: Instruction -> StackList -> StackList
-- executeStep [num, from, to] stack = curr
--     where fromStack = stack !! (from -1)
--           toStack = stack !! (to -1)

-- executeStep instruction  :: StackList -> StackList

-- runInstructions :: [Instruction] -> S.State StackList ()
-- runInstructions [] = return ()
-- runInstructions (x:xs) = S.modify (executeStep x) >>= \_ -> runInstructions xs

-- S.modify :: (s -> s) -> State s ()
-- modify f = State \s -> ((), f s)

-- myState :: State s a
-- (>>=)   => State s a -> (a -> State s b) -> State s b

-- (1)
-- runInstructions ([1,1,1]:[[1,2,2]]) =
-- x = [1,1,1]
-- xs = [[1,2,2]]
-- executeStep1 = executeStep [1,1,1] :: StackList -> StackList
-- State $ \s -> ((), executeStep1 s)
-- runInstructions xs
--
-- (2) 
-- runInstructions ([1,2,2]:[]) =
-- x = [1,2,2]
-- xs = []
-- executeStep2 = executeStep [1,2,2] :: StackList -> StackList
-- State $ \s -> ((), executeStep2 s)
-- runInstructions xs
-- 
-- (3)
-- runInstructions []
-- return ()
-- State $ \s -> ((), s)
--
--       ( .    State $ \s -> ((), executeStep1 s)
--   >>= (\_ -> State $ \s' -> ((), executeStep2 s'))
--   >>= (\_ -> State $ \s'' -> ((), s''))

-- fa :: State s a
-- runState fa :: s -> (a, s)
-- f  :: a -> State s b
-- runState $ f a  :: s -> (b, s)
-- fa >>= f = State $ \s -> let (a, s') = (runState fa $ s) in (runState $ f a) s'
                    -- s -> (b, s)
                    -- State s b
-- S.execState :: S.State StackList () -> StackList -> StackList
-- [[1,1,1],[1,2,2]]

-- solve :: [Instruction] -> String
-- solve xs = fmap last              -- => Stack
--   $ (`S.execState` initialStacks) -- => StackList
--   $ runInstructions xs            -- => S.State StackList ()

initialStacks :: StackList
initialStacks = [
  "JHPMSFNV", "SRLMJDQ",
  "NQDHCSWB", "RSCL",
  "MVTPFB",   "TRQNC",
  "GVR",      "CZSPDLR",
  "DSJVGPBF"]

main :: IO ()
main = do
    contents <- readFile "tests/Day05Crop.txt"
    print $ fmap (fmap (\ d -> read d :: Int) . splitOn ",") (lines contents)