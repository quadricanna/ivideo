import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SubnewsPage } from '../pages/subnews/subnews';
import { NewsPage } from '../pages/news/news';
import { PlayerPage } from '../pages/player/player';
import { PlaylistPage } from '../pages/playlist/playlist';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SubplaylistPage } from '../pages/subplaylist/subplaylist';
import { SettingsPlaylistPage } from '../pages/settings-playlist/settings-playlist';
import { Users } from '../pages/users/users';
import { Password } from '../pages/password/password';
import { MyApps } from '../pages/myapps/myapps';
import { PaySongs } from '../pages/paySongs/paySongs';
import { NotificationPage } from '../pages/notification/notification';

import { Geolocation } from '@ionic-native/geolocation';
import { Market } from '@ionic-native/market';
import { AppRate } from '@ionic-native/app-rate';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { MusicControls } from '@ionic-native/music-controls';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { AdMobFree } from '@ionic-native/admob-free';
import { File } from '@ionic-native/file';
import { Media } from '@ionic-native/media';
import { FileTransfer } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Pro, AppInfo, DeployInfo } from '@ionic-native/pro';

import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { GlobalVariablesService } from '../providers/global-variables';
import { AdmobService } from '../providers/admob';

import { MoreActionService } from '../providers/moreAction';
import { DownloadService } from '../providers/download';
import { ShareService } from '../providers/share';

import { YoutubePipe } from '../pipes/youtube/youtube';
import { ImagePipe } from '../pipes/image/image';
import { TitlePipe } from '../pipes/title/title';





@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    SubnewsPage,
    PlayerPage,
    PlaylistPage,
    HomePage,
    TabsPage,
    LoginPage,
    SubplaylistPage,
    SettingsPlaylistPage,
    Users,
    Password,
    MyApps,
    PaySongs,
    NotificationPage,
    YoutubePipe,
    ImagePipe,
    TitlePipe
    ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    SubnewsPage,
    PlayerPage,
    PlaylistPage,
    HomePage,
    MyApps,
    PaySongs,
    TabsPage,
    LoginPage,
    SubplaylistPage,
    SettingsPlaylistPage,
    Users,
    Password,
    NotificationPage
  ],
  providers: [
    StatusBar,
    Pro,
    SplashScreen,
    OneSignal,
    Device,
    File,
    FileTransfer,
    AdMobFree,
    StreamingMedia,
    Media,
    Geolocation,
    NativeAudio,
    MusicControls,
    BackgroundMode,
    GlobalVariablesService,
    AdmobService,
    MoreActionService,
    DownloadService,
    ShareService,
    InAppBrowser,
    Market,
    AppRate,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
