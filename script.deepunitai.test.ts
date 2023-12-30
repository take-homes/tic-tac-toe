import * as script from "./script";

import {
  PlayerSigns,
  handleCellPlayed,
  handlePlayerChange,
  handleResultValidation,
  handleRestartGame,
} from "./script";
import { describe, it, beforeEach, afterEach, jest } from "@jest/globals";

// Mocking document.querySelector and document.querySelectorAll as they are not available in jest environment
jest.mock("document.querySelector");

jest.mock("document.querySelectorAll");

// Jest provides a suite of methods tied to the global object which makes it easier to write tests in javascript.
// 'describe' creates a block that groups together several related tests in one "test suite".
describe("handleCellPlayed", function () {
  // Jest provides a hook called 'beforeEach' which can be used to set up some setting before each test in the suite is run.
  beforeEach(() => {
    jest.resetAllMocks(); // This will reset all mocks to their initial state before each test
  });
  // Jest provides a hook called 'afterEach' which can be used to clean up some setting after each test in the suite is run.
  afterEach(() => {
    jest.restoreAllMocks(); // This will restore the original (non-mocked) implementation of all mocks after each test.
  });
  // 'it' is an alias of 'test'. It's used to write a single test.
  it("should mark the clicked cell with the current player sign", () => {
    // Arrange
    const clickedCell = { innerHTML: PlayerSigns.X };
    const clickedCellIndex = 0;
    // Act
    handleCellPlayed(clickedCell, clickedCellIndex);
    // Assert
    // We are checking that the clickedCell's innerHTML and the gameState have been updated correctly.
    expect(clickedCell.innerHTML).toBe(PlayerSigns.X);
    expect(gameState[clickedCellIndex]).toBe(PlayerSigns.X);
  });
});

describe("script", function () {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("handlePlayerChange", () => {
    // Mocking the HTML element
    const mockElement = {
      innerHTML: "",
    };
    // Mocking the document.querySelector method
    jest.spyOn(document, "querySelector").mockReturnValue(mockElement);
    it("should switch the current player and update the status display", () => {
      // First we need to ensure that the current player is PlayerSigns.X
      script.currentPlayer = script.PlayerSigns.X;
      // Call the method we are testing
      script.handlePlayerChange();
      // We expect the current player to now be PlayerSigns.O
      expect(script.currentPlayer).toEqual(script.PlayerSigns.O);
      // We also expect the status display to be updated correctly
      expect(mockElement.innerHTML).toEqual(
        `It's ${script.currentPlayer}'s turn`
      );
      // Now we will test the case where the current player is PlayerSigns.O
      script.currentPlayer = script.PlayerSigns.O;
      script.handlePlayerChange();
      expect(script.currentPlayer).toEqual(script.PlayerSigns.X);
      expect(mockElement.innerHTML).toEqual(
        `It's ${script.currentPlayer}'s turn`
      );
    });
  });
});

describe("script.ts", function () {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
  });
  // Restore all mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("handlePlayerChange", () => {
    // Commented example: If you cannot import the functions, you can mock them like so:
    // const handlePlayerChange = jest.fn();
    it("should switch the currentPlayer", () => {
      // Test plan:
      // 1. Set initial currentPlayer
      // 2. Call handlePlayerChange
      // 3. Expect currentPlayer to have switched
      // As an example, let's assume that currentPlayer and PlayerSigns are global variables that we can access:
      let currentPlayer = PlayerSigns.X;
      handlePlayerChange();
      expect(currentPlayer).toEqual(PlayerSigns.O);
    });
  });
  describe("handleResultValidation", () => {
    it("should correctly handle a winning scenario", () => {
      // Test plan:
      // 1. Set a winning gameState
      // 2. Call handleResultValidation
      // 3. Expect gameActive to be false and the statusDisplay's innerHTML to be the winning message
      // As an example, let's assume that gameState and statusDisplay are global variables that we can access:
      gameState = ["X", "X", "X", "", "", "", "", "", ""];
      handleResultValidation();
      expect(gameActive).toBe(false);
      expect(statusDisplay.innerHTML).toEqual(
        `Player ${currentPlayer} has won!`
      );
    });
    it("should correctly handle a draw scenario", () => {
      // Test plan:
      // 1. Set a draw gameState (no empty spaces and no winner)
      // 2. Call handleResultValidation
      // 3. Expect gameActive to be false and the statusDisplay's innerHTML to be the draw message
      gameState = ["X", "O", "X", "X", "O", "X", "O", "X", "O"];
      handleResultValidation();
      expect(gameActive).toBe(false);
      expect(statusDisplay.innerHTML).toEqual(`Game ended in a draw!`);
    });
  });
});

// Mocking document.querySelector and document.querySelectorAll as they are not available in jest environment

// Mocking document.querySelector and document.querySelectorAll as they are not available in jest environment
describe("handleRestartGame", function () {
  let mockQuerySelector: jest.Mock;
  let mockQuerySelectorAll: jest.Mock;
  // Reset all mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
    mockQuerySelector = jest.fn();
    mockQuerySelectorAll = jest.fn();
    document.querySelector = mockQuerySelector;
    document.querySelectorAll = mockQuerySelectorAll;
  });
  // Restore all mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
  // Test to check if gameActive is set to true, currentPlayer is set to PlayerSigns.X and gameState is an empty array
  it("should reset game state", () => {
    handleRestartGame();
    expect(gameActive).toBe(true);
    expect(currentPlayer).toBe(PlayerSigns.X);
    expect(gameState).toEqual(["", "", "", "", "", "", "", "", ""]);
  });
  // Test to check if statusDisplay.innerHTML is set to currentPlayerTurn
  it("should update status display", () => {
    const mockElement = { innerHTML: "" };
    mockQuerySelector.mockReturnValue(mockElement);
    handleRestartGame();
    expect(mockElement.innerHTML).toBe(`It's ${PlayerSigns.X}'s turn`);
  });
  // Test to check if all cells are cleared
  it("should clear all cells", () => {
    const mockElement = { innerHTML: "test" };
    mockQuerySelectorAll.mockReturnValue([mockElement]);
    handleRestartGame();
    expect(mockElement.innerHTML).toBe("");
  });
});
