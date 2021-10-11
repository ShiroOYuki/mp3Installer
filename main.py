import eel
import Static.module as module
import tkinter as tk
from tkinter import filedialog
import json

@eel.expose
def getFolderPath():
    root = tk.Tk()
    root.withdraw()
    path = filedialog.askdirectory()
    print(path)
    root.destroy()
    if not path:
        path = getDefaultPath()
    return path

@eel.expose
def download(url,path):
    print(url)
    installer = module.installer(path)
    installedSize = 0
    installer.downloader(url)
   
@eel.expose
def openOtherPage():
    eel.show("setting.html")

@eel.expose
def getDefaultPath():
    with open("Static/setting.json","r",encoding="utf8") as jfile:
        jdata = json.load(jfile)
    path = jdata["downloadPath"]
    return path

@eel.expose
def savePath(path):
    with open("Static/setting.json","r",encoding="utf8") as jfile:
        jdata = json.load(jfile)
    jdata["downloadPath"] = path

    with open("Static/setting.json","w",encoding="utf8") as jfile:
        json.dump(jdata,jfile,indent=4)


eel.init("GUI")
eel.start("main.html",port=8081)