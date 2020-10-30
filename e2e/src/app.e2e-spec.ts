import {QueoBoardsFrontendPage} from './app.po';

describe('queo boards frontend App', () => {
  let page: QueoBoardsFrontendPage;

  beforeEach(() => {
    page = new QueoBoardsFrontendPage();
  });

  it('should navigate', () => {
    page.navigateTo();
  });
});
