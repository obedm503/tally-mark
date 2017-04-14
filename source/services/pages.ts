export default class Pages {
  public pages: Array<any> = [
    {
      title:'Games',
      viewModel:'./pages/games'
    },{
      title: 'Teams',
      viewModel:'./pages/teams'
    }
  ];
  private defaultPage = this.pages[0];

  add(...page){
    this.pages.push(...page);
  }

  remove(i){
    this.pages.splice(i, 1);
    if(this.pages.length === 0){
      this.add(this.defaultPage);
    }
    return (i === 0 ) ? i : i - 1;
  }
}
