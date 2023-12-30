import * as script from "./script";
import { TextEncoder, TextDecoder } from 'util';
(global.TextDecoder as any) = TextDecoder;
global.TextEncoder = TextEncoder;

import { JSDOM } from 'jsdom';

import {
  PlayerSigns,
  handleCellPlayed,
  handlePlayerChange,
  handleResultValidation,
  handleRestartGame, setCurrentPlayer, gameActive, statusDisplay, currentPlayer, gameState,
} from "./script";
import { describe, it, beforeEach, afterEach, jest } from "@jest/globals";

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
  });
});

describe("script", function () {

  describe("handlePlayerChange", () => {
    let dom: any;
    let document: any;
    
    beforeEach(() => {
      jest.resetAllMocks();
      dom = new JSDOM('<!DOCTYPE html><html><body><div class="game--status"></div></body></html>');
      document = dom.window.document;
  
      // Set global document
      (global.document as any) = document;
    });
    afterEach(() => {
      jest.restoreAllMocks();
      // Clean up
      dom.window.close();
    });
    // Mocking the document.querySelector method
  
  
    it("should switch the current player and update the status display", () => {
      // Get the status display element
      const statusDisplay = document.querySelector('.game--status');
    
      // Call the method we are testing
      script.handlePlayerChange();
    
      // Assertions
      expect(script.currentPlayer).toEqual(PlayerSigns.O);
      expect(statusDisplay.innerHTML).toEqual(`It's ${script.currentPlayer}'s turn`);
    
      // Test for the other player
      setCurrentPlayer(PlayerSigns.O);
      script.handlePlayerChange();
    
      expect(script.currentPlayer).toEqual(PlayerSigns.X);
      expect(statusDisplay.innerHTML).toEqual(`It's ${script.currentPlayer}'s turn`);
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
      let gameState = ["X", "X", "X", "", "", "", "", "", ""];
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
      let gameState = ["X", "O", "X", "X", "O", "X", "O", "X", "O"];
      handleResultValidation();
      expect(gameActive).toBe(false);
      expect(statusDisplay.innerHTML).toEqual(`Game ended in a draw!`);
    });
  });
});

// Mocking document.querySelector and document.querySelectorAll as they are not available in jest environment

// Mocking document.querySelector and document.querySelectorAll as they are not available in jest environment
describe("handleRestartGame", function () {
  let mockQuerySelector: jest.Spied<any>;
  let mockQuerySelectorAll: jest.Spied<any>;
  // Reset all mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
    mockQuerySelector = jest.spyOn(document, 'querySelector');
    mockQuerySelectorAll = jest.spyOn(document, 'querySelectorAll');
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
