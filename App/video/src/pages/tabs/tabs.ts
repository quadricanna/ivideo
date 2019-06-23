import { Component } from '@angular/core';

import { NewsPage } from '../news/news';
import { PlayerPage } from '../player/player';
import { PlaylistPage } from '../playlist/playlist';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewsPage;
  tab3Root = PlaylistPage;
  tab4Root = PlayerPage;

  constructor() {

  }
}
