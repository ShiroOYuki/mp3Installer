from pytube import YouTube,Playlist
import json
import re

class installer:
    def __init__(self,downloadPath=None):
        with open("./Static/setting.json","r",encoding="utf8") as f:
            jdata = json.load(f)
        self.downloadPath = jdata["downloadPath"]
        if downloadPath:
            self.downloadPath = downloadPath

    def progress(self,chunk,chunksize,bytes_remaining):
        contentSize = self.video.filesize
        installedSize = contentSize - bytes_remaining
        
    def IsList(self,url):
            return "&list=" in self.url

    def downloader(self,url):
        if not self.IsList(url):
            self.getMp3(url)
        else:
            self.getMp3List(url)

    def getMp3(self,url):
        yt = YouTube(url,on_progress_callback=self.progress,on_complete_callback=self.complete)
        self.video = yt.streams.filter(only_audio=True).first()
        self.video.download(output_path=self.downloadPath,filename="{}.mp3".format(re.sub('[\/:*?"<>|]','-',yt.title)))

    def getMp3List(self,url):
        playlist = Playlist(url)
        for url in playlist.video_urls:
            self.getMp3(url)

    def getSongsCount(self,url):
        if self.IsList(url):
            playlist = Playlist(url)
            return len(playlist)
        return 1
            

