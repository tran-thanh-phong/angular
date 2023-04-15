import { IsAdultPipe } from './is-adult.pipe';

describe('IsAdultPipe', () => {
  it('create an instance', () => {
    const pipe = new IsAdultPipe();
    expect(pipe).toBeTruthy();
  });
});
