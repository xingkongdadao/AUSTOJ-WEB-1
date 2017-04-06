import { AustojPage } from './app.po';

describe('austoj App', () => {
  let page: AustojPage;

  beforeEach(() => {
    page = new AustojPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
