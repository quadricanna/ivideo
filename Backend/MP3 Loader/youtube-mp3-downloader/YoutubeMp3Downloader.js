"use strict";
var os = require("os");
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var ffmpeg = require("fluent-ffmpeg");
var ytdl = require("ytdl-core");
var async = require("async");
var progress = require("progress-stream");
var fs = require("fs");

function YoutubeMp3Downloader(options) {

    var self = this;

    self.youtubeBaseUrl = "http://www.youtube.com/watch?v=";
    self.youtubeVideoQuality = (options && options.youtubeVideoQuality ? options.youtubeVideoQuality : "highest");
    self.outputPath = (options && options.outputPath ? options.outputPath : (os.platform() === "root" ? "/root/Documents/youtube-videos/Temp" : "/tmp")); //(os.platform() === "win32" ? "C:/Windows/Temp" : "/tmp"));
    self.queueParallelism = (options && options.queueParallelism ? options.queueParallelism : 1);
    self.progressTimeout = (options && options.progressTimeout ? options.progressTimeout : 1000);
    self.fileNameReplacements = [[/"/g, ""], [/'/g, ""], [/\//g, ""], [/\?/g, ""], [/:/g, ""], [/;/g, ""]];
    self.requestOptions = (options && options.requestOptions ? options.requestOptions : { maxRedirects: 5 });

    if (options && options.ffmpegPath) {
        ffmpeg.setFfmpegPath(options.ffmpegPath);
    }

    //Async download/transcode queue
    self.downloadQueue = async.queue(function (task, callback) {

        self.emit("queueSize", self.downloadQueue.running() + self.downloadQueue.length());

        self.performDownload(task, function(err, result) {
            callback(err, result);
        });

    }, self.queueParallelism);

}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

util.inherits(YoutubeMp3Downloader, EventEmitter);

YoutubeMp3Downloader.prototype.cleanFileName = function(fileName) {
    var self = this;

    self.fileNameReplacements.forEach(function(replacement) {
        fileName = fileName.replace(replacement[0], replacement[1]);
    });

    return fileName;
};

YoutubeMp3Downloader.prototype.download = function(videoId, fileName) {

    var self = this;
    var task = {
        videoId: videoId,
        fileName: fileName
    };

    self.downloadQueue.push(task, function (err, data) {

        self.emit("queueSize", self.downloadQueue.running() + self.downloadQueue.length());

        if (err) {
            self.emit("error", err, data);
        } else {
            self.emit("finished", err, data);
        }
    });

};

YoutubeMp3Downloader.prototype.performDownload = function(task, callback) {

    var self = this;
    var videoUrl = self.youtubeBaseUrl+task.videoId;
    var resultObj = {
        videoId: task.videoId
    };

    ytdl.getInfo(videoUrl, function(err, info){

        if (err) {
            callback(err.message, resultObj);
        } else {
            var videoTitle = self.cleanFileName(info.title);
            var videoTitle = videoTitle.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            videoTitle = videoTitle.replace(/\s\s+/g, ' ');
            videoTitle = videoTitle.replace(/[^\x00-\x7F]/g, "");
            videoTitle = videoTitle.replace(/\s\s+/g, ' ');

            var artist = "Unknown";
            var title = "Unknown";
            var thumbnail = info.iurlhq || null;

            if(videoTitle.length <= 1 ){
                videoTitle = "MymusicLoader "+ guidGenerator();
            }
            if (videoTitle.indexOf("-") > -1) {
                var temp = videoTitle.split("-");
                if (temp.length >= 2) {
                    artist = temp[0].trim();
                    title = temp[1].trim();
                }
            } else {
                title = videoTitle;
            }

            //Derive file name, if given, use it, if not, from video title
            var fileName;
            fileName =  self.outputPath + "/" +task.fileName +"/"+ videoTitle + ".mp4";
            self.youtubeVideoQuality=[22,18,37,38,82,83,84,85,133,134,135,136,137,138,160,298,299]

            ytdl.getInfo(videoUrl, { quality: self.youtubeVideoQuality }, function(err, info) {

                //Stream setup
                var stream = ytdl.downloadFromInfo(info, {
                    quality: self.youtubeVideoQuality,
                    requestOptions: self.requestOptions
                });

                stream.on("response", function(httpResponse) {

                    //Setup of progress module
                    var str = progress({
                        length: parseInt(httpResponse.headers["content-length"]),
                        time: self.progressTimeout
                    });

                    //Add progress event listener
                    str.on("progress", function(progress) {
                        if (progress.percentage === 100) {
                            resultObj.stats= {
                                transferredBytes: progress.transferred,
                                runtime: progress.runtime,
                                averageSpeed: parseFloat(progress.speed.toFixed(2))
                            }
                        }
                        self.emit("progress", {videoId: task.videoId, progress: progress})
                    });

                    stream.pipe(fs.createWriteStream(fileName))
                    .on("error", function(err) {
                        callback(err.message, null);
                    })
                    .on("finish", function() {
                        resultObj.file =  fileName;
                        resultObj.youtubeUrl = videoUrl;
                        resultObj.videoTitle = videoTitle;
                        resultObj.artist = artist;
                        resultObj.title = title;
                        resultObj.thumbnail = thumbnail;
                        resultObj.videoId = task.videoId;
                        resultObj.format = task.fileName;
                        console.log("Downloaded: " + videoTitle);
                        callback(null, resultObj);
                    })
                    ;
                });

            });
        }

    });

};

module.exports = YoutubeMp3Downloader;
