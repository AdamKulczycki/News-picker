import { CutTextPipe } from './cut-text.pipe';

describe('CutTextPipe', () => {
  it('create an instance', () => {
    const pipe = new CutTextPipe();
    expect(pipe).toBeTruthy();
  });
  it('pipe validity', () => {
    const pipe = new CutTextPipe();
    expect(pipe.transform('', 120)).toBeFalsy();
    expect(pipe.transform('hello', 2)).toBe('he...');
    expect(pipe.transform('hello', 10)).toBe('hello');
  });
});
