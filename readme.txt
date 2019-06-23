App:

Versions:

Cordova 7.0.1
NPM 6.9.0
NodeJS v10.15.3
ionic 5.0.2
cordova ios 4.5.5


Start App: 
Setup app id in config.xml
add your Backend API Domain or IP to GlobalVariablesService


cd platforms/ios/cordova/
npm install ios-sim or install globally

create profiles and certificates in apple account and download them via xcode

Ionic Build:
ionic cordova build ios
ionic cordova prepare ios

sudo ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0" --verbose

Run with XCode 
or 
sudo ionic cordova emulate ios -l -c  -- --buildFlag="-UseModernBuildSystem=0" --verbose
or with ionic serve in browser (no cordova support)

Hints:

ios 12.2 fix

change in cordova background mode plugin via editor:

X2Fsd2F5c1J1bnNBdEZvcmVncm91bmRQcmlvcml0eQ==
to 
YWx3YXlzUnVuc0F0Rm9yZWdyb3VuZFByaW9yaXR5

-use https for communication with server or adapt the manifest file (plist)

Ionic 3 Documentation: https://ionicframework.com/docs/v3/



MySQL - 8.0.15 - MySQL Community Server - GPL:
- import the data structure
- eventually you like phpmyadmin and can also install this on your server



Backend:

Versions:
npm 6.7.0
nodeJs 11.10.0

there are 2 projects:

- video for user handling and interactions with the app
- mp3 loader for downloading the files to your server 
mp3loader is using ffmpeg for downloading files from youtube, for windows they are supported via assets, for linux you need to install them e.g. https://itsfoss.com/ffmpeg/

for each project you have to install all the dependencies via npm install

in mp3 loader project:
- change domains and path in mp3.js for ffmpeg, output path of the files, check that you have the permissions for read and write into this folders
- change password and username of database in connection(Video).js
- in the index.js you can set up credentials if you like to use the monitoring dashboard of your api
- the download will be exceuted via youtube-mp3-downloader maybe you have to adapt the dependency with the configuration of YoutubeMp3Downloader.js for better perfomance

in video project:
- add your one signal api key and app id to payment.js, users.js, video.js
- in paypal.js, paypalSongs.js change add your paypal api secret
- change your database settings in connection files 
- in the index.js you can set up credentials if you like to use the monitoring dashboard of your api

for logging we are using iisnode and as web server iisnode, certificates can be requested via lets encrypt

