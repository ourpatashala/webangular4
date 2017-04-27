import { PatashalaAppPage } from './app.po';

describe('patashala-app App', function() {
  let page: PatashalaAppPage;

  beforeEach(() => {
    page = new PatashalaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
