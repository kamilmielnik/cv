import { formatNumberOfMonths } from './lib';

describe('PositionEntry/lib', () => {
  it('formatNumberOfMonths', () => {
    expect(formatNumberOfMonths(1)).toBe('1 mo');
    expect(formatNumberOfMonths(2)).toBe('2 mos');
    expect(formatNumberOfMonths(3)).toBe('3 mos');
    expect(formatNumberOfMonths(4)).toBe('4 mos');
    expect(formatNumberOfMonths(5)).toBe('5 mos');
    expect(formatNumberOfMonths(6)).toBe('0.5 yr');
    expect(formatNumberOfMonths(7)).toBe('7 mos');
    expect(formatNumberOfMonths(8)).toBe('8 mos');
    expect(formatNumberOfMonths(9)).toBe('9 mos');
    expect(formatNumberOfMonths(10)).toBe('10 mos');
    expect(formatNumberOfMonths(11)).toBe('11 mos');
    expect(formatNumberOfMonths(12)).toBe('1 yr');
    expect(formatNumberOfMonths(13)).toBe('1 yr 1 mo');
    expect(formatNumberOfMonths(14)).toBe('1 yr 2 mos');
    expect(formatNumberOfMonths(15)).toBe('1 yr 3 mos');
    expect(formatNumberOfMonths(16)).toBe('1 yr 4 mos');
    expect(formatNumberOfMonths(17)).toBe('1 yr 5 mos');
    expect(formatNumberOfMonths(18)).toBe('1.5 yr');
    expect(formatNumberOfMonths(19)).toBe('1 yr 7 mos');
    expect(formatNumberOfMonths(20)).toBe('1 yr 8 mos');
    expect(formatNumberOfMonths(21)).toBe('1 yr 9 mos');
    expect(formatNumberOfMonths(22)).toBe('1 yr 10 mos');
    expect(formatNumberOfMonths(23)).toBe('1 yr 11 mos');
    expect(formatNumberOfMonths(24)).toBe('2 yrs');
    expect(formatNumberOfMonths(25)).toBe('2 yrs 1 mo');
    expect(formatNumberOfMonths(26)).toBe('2 yrs 2 mos');
    expect(formatNumberOfMonths(27)).toBe('2 yrs 3 mos');
    expect(formatNumberOfMonths(28)).toBe('2 yrs 4 mos');
    expect(formatNumberOfMonths(29)).toBe('2 yrs 5 mos');
    expect(formatNumberOfMonths(30)).toBe('2.5 yrs');
    expect(formatNumberOfMonths(31)).toBe('2 yrs 7 mos');
    expect(formatNumberOfMonths(32)).toBe('2 yrs 8 mos');
    expect(formatNumberOfMonths(33)).toBe('2 yrs 9 mos');
    expect(formatNumberOfMonths(34)).toBe('2 yrs 10 mos');
    expect(formatNumberOfMonths(35)).toBe('2 yrs 11 mos');
    expect(formatNumberOfMonths(36)).toBe('3 yrs');
  });
});