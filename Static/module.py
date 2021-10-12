from pytube import YouTube,Playlist
import json
import re
import eel

class installer:
    def __init__(self,downloadPath=None):
        with open("./Static/setting.json","r",encoding="utf8") as f:
            jdata = json.load(f)
        self.downloadPath = jdata["downloadPath"]
        if downloadPath:
            self.downloadPath = downloadPath
        self.totalSize = 100
        self.installedSize = 0
        

    def progress(self,chunk,chunksize,bytes_remaining):
        contentSize = self.video.filesize
        installedSize = contentSize - bytes_remaining
        totalSize = 100
        self.installedSize = int(round(installedSize/contentSize*100))
        eel.changeProgressBar(self.installedSize)
        


    def complete(self,stream,filePath):
        eel.downloadComplete()
        
    def IsList(self,url):
            return "&list=" in url

    def downloader(self,url):
        if not self.IsList(url):
            print("video")
            self.getMp3(url)
        else:
            print("list")
            self.getMp3List(url)

    def getMp3(self,url):
        yt = YouTube(url,on_progress_callback=self.progress,on_complete_callback=self.complete)
        with open("./Static/setting.json","r",encoding='utf8') as jfile:
            jdata = json.load(jfile)
        kbps = jdata["kbps"]
        if kbps==0:
            self.video = yt.streams.filter(only_audio=True,mime_type='audio/webm')[0] # webm 50kbps
        elif kbps==1:
            self.video = yt.streams.filter(only_audio=True,mime_type='audio/webm')[1] # webm 70kbps
        elif kbps==2:
            self.video = yt.streams.filter(adaptive=True)[13]# webm 128kbps
        else:
            self.video = yt.streams.filter(only_audio=True,mime_type='audio/webm')[2] # webm 160kbps
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
            

