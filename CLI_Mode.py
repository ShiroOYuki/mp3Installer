from pytube import YouTube,Playlist
import json
import re


class installer:
    def __init__(self,url):
        self.url = url
        
        with open("./Static/setting.json","r",encoding="utf8") as f:
            jdata = json.load(f)
        self.downloadPath = jdata["downloadPath"]
        
        print(self.downloadPath)
        
        
        self.yt = YouTube(self.url,on_progress_callback=self.progress,on_complete_callback=self.complete)
    
    def progress(self,chunk,chunksize,bytes_remaining):
        contentSize = self.video.filesize
        installedSize = contentSize - bytes_remaining
        print("\r[Download progress]:|{}{}|".format('█' * int(installedSize/contentSize*40),'▒' * (40-int(installedSize/contentSize*40))),end = "")
        
    def complete(self,stream,filePath):
        print(f"\n\nComplete!\n\n{'―'*80}")
        
    def IsList(self,url):
        return "&list=" in url

    def downloader(self):
        if not self.IsList(self.url):
            self.getMp3()
        else:
            self.getMp3List()

    def getMp3(self): 
        print(f"{'―'*80}\n\n{self.yt.title}\n")
        self.video = self.yt.streams.filter(only_audio=True).first()
        self.video.download(output_path=self.downloadPath,filename="{}.mp3".format(re.sub('[\/:*?"<>|]','-',self.yt.title)))
        self.newURL()   

    def getMp3List(self):
        playlist = Playlist(self.url)
        c = 1
        totalCount = len(playlist.video_urls)
        for url in playlist.video_urls:
            print(f"[{c}/{totalCount}]")
            c+=1
            print(url)
            self.url = url
            self.yt = YouTube(self.url,on_progress_callback=self.progress,on_complete_callback=self.complete)
            print(f"{'―'*80}\n\n{self.yt.title}\n")
            self.video = self.yt.streams.filter(only_audio=True).first()
            self.video.download(output_path=self.downloadPath,filename="{}.mp3".format(re.sub('[\/:*?"<>|]','-',self.yt.title)))
        self.newURL()

    def newURL(self):
        self.url = input("URL:")
        self.yt = YouTube(self.url,on_progress_callback=self.progress,on_complete_callback=self.complete)
        self.downloader()

        

if __name__ == '__main__':
    ins = installer(input("URL:"))
    ins.downloader()