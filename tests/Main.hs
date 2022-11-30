module Main where

import Test.Hspec
import DayOne

main :: IO ()
main = hspec $ do
  describe "aoc" $ do
    it "test" $ do
      asdf `shouldBe` 1