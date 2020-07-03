import joinContinuousTimePeriods from './joinContinuousTimePeriods';

const testCases = [
  {
    input: [],
    output: []
  },
  {
    input: [{ start: new Date(2012, 9, 1), end: new Date(2013, 2, 31) }],
    output: [{ start: new Date(2012, 9, 1), end: new Date(2013, 2, 31) }]
  },
  {
    input: [
      { start: new Date(2012, 9, 1), end: new Date(2013, 2, 31) },
      { start: new Date(2014, 1, 7), end: new Date(2014, 5, 30) },
      { start: new Date(2012, 6, 1), end: new Date(2012, 8, 30) }
    ],
    output: [
      { start: new Date(2012, 6, 1), end: new Date(2013, 2, 31) },
      { start: new Date(2014, 1, 7), end: new Date(2014, 5, 30) }
    ]
  },
  {
    input: [
      { start: new Date(2012, 9, 1), end: new Date(2013, 2, 31) },
      { start: new Date(2012, 6, 1), end: new Date(2012, 8, 30) },
      { start: new Date(2014, 1, 7), end: new Date(2014, 5, 30) }
    ],
    output: [
      { start: new Date(2012, 6, 1), end: new Date(2013, 2, 31) },
      { start: new Date(2014, 1, 7), end: new Date(2014, 5, 30) }
    ]
  },
  {
    input: [
      { start: new Date(2012, 6, 1), end: new Date(2012, 8, 30) },
      { start: new Date(2012, 9, 1), end: new Date(2013, 2, 31) },
      { start: new Date(2014, 1, 7), end: new Date(2014, 5, 30) }
    ],
    output: [
      { start: new Date(2012, 6, 1), end: new Date(2013, 2, 31) },
      { start: new Date(2014, 1, 7), end: new Date(2014, 5, 30) }
    ]
  }
];

describe('joinContinuousTimePeriods', () => {
  for (const { input, output } of testCases) {
    it(`joinContinuousTimePeriods(${JSON.stringify(input)}) === '${JSON.stringify(
      output
    )}'`, () => {
      expect(joinContinuousTimePeriods(input)).toEqual(output);
    });
  }
});
