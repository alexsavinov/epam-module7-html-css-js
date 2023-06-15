'use strict';

const assert = require('assert');


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

it('toBase2Converter test', () => {
    assert.equal(toBase2Converter(5), 101);
    assert.equal(toBase2Converter(10), 1010);
});


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

it('substringOccurrencesCounter test', () => {
    assert.equal(substringOccurrencesCounter('a', 'test it'), 0);
    assert.equal(substringOccurrencesCounter('t', 'test it'), 3);
    assert.equal(substringOccurrencesCounter('T', 'test it'), 3);
});


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

console.log('--- [substringOccurrencesCounter2 - init without regex]');
console.log(substringOccurrencesCounter2('a', 'test it'));
console.log(substringOccurrencesCounter2('t', 'test it'));
console.log(substringOccurrencesCounter2('T', 'test it'));

it('substringOccurrencesCounter2 test', () => {
    assert.equal(substringOccurrencesCounter2('a', 'test it'), 0);
    assert.equal(substringOccurrencesCounter2('t', 'test it'), 3);
    assert.equal(substringOccurrencesCounter2('T', 'test it'), 3);
});


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
    let result = '';

    for (let i = 0; i < string.length; i++) {
        result += string[i] + string[i];
    }

    return result;
}

console.log('--- [repeatingLitters]');
console.log(repeatingLitters('Hello'));
console.log(repeatingLitters('Hello world'));

it('repeatingLitters test', () => {
    assert.equal(repeatingLitters('Hello'), 'HHeelllloo');
    assert.equal(repeatingLitters('Hello world'), 'HHeelllloo  wwoorrlldd');
});


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
    return function () {
        return str;
    };
}

console.log('--- [redundant]');
const f1 = redundant('apple')
console.log(f1())
const f2 = redundant('pear')
console.log(f2())
const f3 = redundant('')
console.log(f3())

it('redundant test', () => {
    assert.equal(redundant('apple')(), 'apple');
    assert.equal(redundant('pear')(), 'pear');
    assert.equal(redundant('')(), '');
});


/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    return Math.pow(2, disks) - 1;
}

/**
 * The towerHanoi function takes the number of disks as an input (disks) and returns the minimum number of moves
 * required to solve the Tower of Hanoi puzzle with that number of disks.
 * The formula to calculate the minimum number of moves for Tower of Hanoi is 2^n - 1, where n is the number of disks.
 * This formula represents the optimal solution for the puzzle.
 */

console.log('--- [towerHanoi]');
console.log(towerHanoi(3));
console.log(towerHanoi(4));
console.log(towerHanoi(5));

it('towerHanoi test', () => {
    assert.equal(towerHanoi(3), 7);
    assert.equal(towerHanoi(4), 15);
    assert.equal(towerHanoi(5), 31);
});


/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    const n = matrix1.length;
    const result = [];

    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = 0;
            for (let k = 0; k < n; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

const matrix1 = [[1, 2], [3, 4]];
const matrix2 = [[5, 6], [7, 8]];

const result = matrixMultiplication(matrix1, matrix2);
console.log('--- [matrixMultiplication]');
console.log(result); // Output: [ [ 19, 22 ], [ 43, 50 ] ]

it('matrixMultiplication test', () => {
    assert.deepEqual(matrixMultiplication([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [ [ 19, 22 ], [ 43, 50 ] ]);
});


/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {any}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    let gatheredCollection = new Array(str);
    let orderCollection = [];

    function innerFunction(nextValue) {
        if (orderCollection.length) {
            orderCollection.push(nextValue);
        } else {
            gatheredCollection.push(nextValue);
        }
        return innerFunction;
    }
f
    innerFunction.order = function (indices) {
        orderCollection.push(indices);
        return innerFunction;
    };

    innerFunction.get = function () {
        return orderCollection.map((ind) => gatheredCollection[ind]).join('');
    };

    return innerFunction;
}

console.log(gather('a')('b')('c').order(0)(1)(2).get());
console.log(gather('a')('b')('c').order(2)(1)(0).get());
console.log(gather('e')('l')('o')('l')('!')('h').order(5)(0)(1)(3)(2)(4).get());

it('gather test', () => {
    assert.equal(gather('a')('b')('c').order(0)(1)(2).get(), 'abc');
    assert.equal(gather('a')('b')('c').order(2)(1)(0).get(), 'cba');
    assert.equal(gather('e')('l')('o')('l')('!')('h').order(5)(0)(1)(3)(2)(4).get(), 'hello!');
});
