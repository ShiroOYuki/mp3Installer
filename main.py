import eel
import Static.module as module
import tkinter as tk
from tkinter import filedialog
import asyncio


@eel.expose
def getFolderPath():
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askdirectory()
    root.destroy()
    print(file_path)
    return file_path

@eel.expose
def download(url,path):
    installer = module.installer(path)
    installedSize = 0
    installer.downloader(url)
   
@eel.expose
def openOtherPage():
    eel.show("setting.html")




eel.init("GUI")
eel.start("main.html",port=8081)