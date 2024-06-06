// Imports
import { describe, it, expect } from 'vitest';

describe('Sum test', () => {
  it('adds 1 + 2 to equal 3', () => {
    // Arrange
    const one = 1;
    const two = 2;
    const expectedSum = 3;

    // Act
    const sum = one + two;

    // Assert
    expect(sum).toBe(expectedSum);
  });
});
