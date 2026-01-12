import {
  concateDatePickerClass,
  convertADYearToROCYear,
  dateTimeFormat,
} from './utils';

describe('convertADYearToROCYear', () => {
  it('should convert AD year to ROC year correctly', () => {
    expect(convertADYearToROCYear(2024)).toBe(113);
    expect(convertADYearToROCYear(1911)).toBe(0);
  });
});

describe('dateTimeFormat', () => {
  it('should return the correct date format for default calendar without time', () => {
    const formatDate = dateTimeFormat();
    const date = new Date('2024-10-24');
    expect(formatDate(date)).toBe('2024-10-24');
  });

  it('should return the correct date format for default calendar with time', () => {
    const formatDate = dateTimeFormat('default', true);
    const date = new Date('2024-10-24T14:30:00');
    expect(formatDate(date)).toBe('2024-10-24 14:30');
  });

  it('should return the correct date format for ROC calendar without time', () => {
    const formatDate = dateTimeFormat('ROC');
    const date = new Date('2024-10-24');
    expect(formatDate(date)).toBe('113-10-24');
  });

  it('should return the correct date format for ROC calendar with time', () => {
    const formatDate = dateTimeFormat('ROC', true);
    const date = new Date('2024-10-24T14:30:00');
    expect(formatDate(date)).toBe('113-10-24 14:30');
  });

  it('should return an empty string for null or undefined date', () => {
    const formatDateDefault = dateTimeFormat();
    const formatDateROC = dateTimeFormat('ROC');
    expect(formatDateDefault(null)).toBe('');
    expect(formatDateDefault(undefined)).toBe('');
    expect(formatDateROC(null)).toBe('');
    expect(formatDateROC(undefined)).toBe('');
  });
});

describe('concateDatePickerClass', () => {
  it('should concatenate class names correctly', () => {
    const result = concateDatePickerClass('class1', 'class2 class3', [
      'class4',
      'class5',
    ]);
    expect(result).toEqual(['class1', 'class2', 'class3', 'class4', 'class5']);
  });

  it('should handle empty input', () => {
    const result = concateDatePickerClass();
    expect(result).toEqual([]);
  });
});
