import formatNumberOfMonths from './formatNumberOfMonths';

const testCases = [
  { input: 1, output: '1 mo' },
  { input: 2, output: '2 mos' },
  { input: 3, output: '3 mos' },
  { input: 4, output: '4 mos' },
  { input: 5, output: '5 mos' },
  { input: 6, output: '0.5 yr' },
  { input: 7, output: '7 mos' },
  { input: 8, output: '8 mos' },
  { input: 9, output: '9 mos' },
  { input: 10, output: '10 mos' },
  { input: 11, output: '11 mos' },
  { input: 12, output: '1 yr' },
  { input: 13, output: '1 yr 1 mo' },
  { input: 14, output: '1 yr 2 mos' },
  { input: 15, output: '1 yr 3 mos' },
  { input: 16, output: '1 yr 4 mos' },
  { input: 17, output: '1 yr 5 mos' },
  { input: 18, output: '1.5 yr' },
  { input: 19, output: '1 yr 7 mos' },
  { input: 20, output: '1 yr 8 mos' },
  { input: 21, output: '1 yr 9 mos' },
  { input: 22, output: '1 yr 10 mos' },
  { input: 23, output: '1 yr 11 mos' },
  { input: 24, output: '2 yrs' },
  { input: 25, output: '2 yrs 1 mo' },
  { input: 26, output: '2 yrs 2 mos' },
  { input: 27, output: '2 yrs 3 mos' },
  { input: 28, output: '2 yrs 4 mos' },
  { input: 29, output: '2 yrs 5 mos' },
  { input: 30, output: '2.5 yrs' },
  { input: 31, output: '2 yrs 7 mos' },
  { input: 32, output: '2 yrs 8 mos' },
  { input: 33, output: '2 yrs 9 mos' },
  { input: 34, output: '2 yrs 10 mos' },
  { input: 35, output: '2 yrs 11 mos' },
  { input: 36, output: '3 yrs' }
];

describe('formatNumberOfMonths', () => {
  for (const { input, output } of testCases) {
    it(`formatNumberOfMonths(${input}) === '${output}'`, () => {
      expect(formatNumberOfMonths(input)).toBe(output);
    });
  }
});
