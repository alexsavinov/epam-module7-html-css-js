'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    const baseDate = new Date('2020-06-01T00:00:00.2020Z');
    const targetDate = new Date(baseDate.getTime() + seconds * 1000);
    return targetDate;
}

console.log('--- [secondsToDate]');
console.log(secondsToDate(31536000));
console.log(secondsToDate(0));
console.log(secondsToDate(86400));

/* test */
const assert = require('assert');

it('secondsToDate test', () => {
  assert.deepEqual(secondsToDate(31536000), new Date('2021-06-01T00:00:00.202Z'));
  assert.deepEqual(secondsToDate(0), new Date('2020-06-01T00:00:00.202Z'));
  assert.deepEqual(secondsToDate(86400), new Date('2020-06-02T00:00:00.202Z'));
});

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    if (decimal === 0) {
        return '0'; // Special case for decimal 0
    }

    let binary = '';
    let temp = decimal;

    while (temp > 0) {
        binary = (temp % 2) + binary;
        temp = Math.floor(temp / 2);
    }

    return binary;
}

console.log('--- [toBase2Converter]');
console.log(toBase2Converter(5));
console.log(toBase2Converter(10));

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    const regex = new RegExp(substring, 'gi');
    const matches = text.match(regex);

    return matches ? matches.length : 0;
}

console.log('--- [toBase2Converter]');
console.log(substringOccurrencesCounter('a', 'test it'));
console.log(substringOccurrencesCounter('t', 'test it'));
console.log(substringOccurrencesCounter('T', 'test it'));

function substringOccurrencesCounter2(substring, text) {
  const lowerCaseSubstring = substring.toLowerCase();
  const lowerCaseText = text.toLowerCase();

  let count = 0;
  let index = lowerCaseText.indexOf(lowerCaseSubstring);

  while (index !== -1) {
    count++;
    index = lowerCaseText.indexOf(lowerCaseSubstring, index + 1);
  }

  return count;
}

console.log('--- [toBase2Converter - init without regex]');
console.log(substringOccurrencesCounter2('a', 'test it'));
console.log(substringOccurrencesCounter2('t', 'test it'));
console.log(substringOccurrencesCounter2('T', 'test it'));

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {

}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {

}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {

}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {

}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {

}