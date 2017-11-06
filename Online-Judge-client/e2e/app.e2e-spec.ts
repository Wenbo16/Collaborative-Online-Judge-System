import { OnlineJudgeClientPage } from './app.po';

describe('online-judge-client App', () => {
  let page: OnlineJudgeClientPage;

  beforeEach(() => {
    page = new OnlineJudgeClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
