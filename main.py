import socket
import eel
import Static.module as module
import tkinter as tk
from tkinter import filedialog
import json
import sys
sys.coinit_flags = 2  # COINIT_APARTMENTTHREADED


@eel.expose
def getFolderPath():
    print("getFolderPath")
    root = tk.Tk()
    root.withdraw()
    # https://github.com/pywinauto/pywinauto/issues/517
    path = filedialog.askdirectory()# 很常死在這行
    print(path)
    root.destroy()
    return path

@eel.expose
def download(url,path):
    print("download")
    print(url)
    installer = module.installer(path)
    installedSize = 0
    installer.downloader(url)
   
@eel.expose
def openOtherPage():
    print("openOtherPage")
    eel.show("setting.html")

@eel.expose
def getDefaultPath():
    print("getDefaultPath")
    with open("Static/setting.json","r",encoding="utf8") as jfile:
        jdata = json.load(jfile)
    path = jdata["downloadPath"]
    return path

@eel.expose
def savePath(path):
    print("savePath")
    with open("Static/setting.json","r",encoding="utf8") as jfile:
        jdata = json.load(jfile)
    jdata["downloadPath"] = path
    with open("Static/setting.json","w",encoding="utf8") as jfile:
        json.dump(jdata,jfile,indent=4)

def checkPortInUse(port,host='127.0.0.1'):
    s = None
    try:
        s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        s.settimeout(1)
        s.connect((host,int(port)))
        if s:
            s.close()
        return True
    except socket.error:
        if s:
            s.close()
        return False
        

eel.init("GUI")
port=8080
while checkPortInUse(port):
    port+=1
print(f"Port:{port}")
eel.start("main.html",port=port)