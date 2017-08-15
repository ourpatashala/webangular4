import { Patashala4Page } from './app.po';

describe('patashala4 App', () => {
  let page: Patashala4Page;

  beforeEach(() => {
    page = new Patashala4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
