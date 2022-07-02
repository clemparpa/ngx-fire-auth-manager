import { ngxFireAuthClearErrorActions } from './clear-error-action.actions';

describe('clearErrorAction', () => {
  it('should return ngxFireAuthClearErrorActions', () => {
    expect(ngxFireAuthClearErrorActions().type).toBe(
      '[ClearErrorAction] ngxFireAuth ClearErrorAction'
    );
  });
});
