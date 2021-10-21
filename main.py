import socket
import eel
import Static.module as module
import sys
sys.coinit_flags = 2  # COINIT_APARTMENTTHREADED
import tkinter as tk
import tkinter.filedialog as tf
import json
import os

PATH = os.getcwd()
SETTING_PATH = os.path.join(PATH,"Static/setting.json")
GUI = os.path.join(PATH,"GUI")

def readSetting(key:str):
    with open(SETTING_PATH,"r",encoding='utf8') as jfile:
        jdata = json.load(jfile)
    return jdata[key]

def writeSetting(key:str,data):
    with open(SETTING_PATH,"r",encoding='utf8') as jfile:
        jdata = json.load(jfile)
    jdata[key] = data
    with open(SETTING_PATH,"w",encoding='utf8') as jfile:
        json.dump(jdata,jfile,indent=4)

@eel.expose
def askFolderDialog():
    print("askFolderDialog")
    root = tk.Tk()

    # 隱藏窗口
    # root.withdraw() 會導致下面的 directory dialog 出不來
    # 改用下面兩行代替
    root.overrideredirect(True) # 隱藏標題欄
    root.geometry("0x0") # 視窗大小為 0*0
    root.attributes("-topmost", True)
    path = tf.askdirectory()
    root.destroy()
    print(path)
    return path

@eel.expose
def downloadMp3(url,path):
    print("downloadMp3")
    print(url)
    installer = module.installer(path)
    installedSize = 0
    installer.downloader(url)
   
@eel.expose
def newPage():
    print("newPage")
    eel.show("setting.html")

@eel.expose
def askDefaultPath():
    print("askDefaultPath")
    return readSetting("downloadPath")

@eel.expose
def setDefaultPath(path):
    print("setDefaultPath")
    writeSetting("downloadPath",path)

@eel.expose
def setDefaultKbps(kbps):
    print("setDefaultKbps")
    writeSetting("kbps",int(kbps))
        
@eel.expose
def askKbps():
    print("askKbps")
    return readSetting("kbps")

@eel.expose
def setAutosave(autosave):
    print("setAutosave")
    writeSetting("autosave",autosave)

@eel.expose
def isAutosave():
    print("isAutosave")
    return readSetting("autosave")

@eel.expose
def jsPrint(index):
    print(index)


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
        

eel.init(GUI)
port=8080
while checkPortInUse(port):
    port+=1
print(f"Port:{port}")
eel.start("main.html",port=port)