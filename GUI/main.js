async function callGetFolderPath(){
    path = await eel.getFolderPath()();
    document.getElementById("path").value = path;
}

async function callDownload(){
    url = document.getElementById("url").value
    path = document.getElementById("path").value;
    await eel.download(url,path)();
}

function reset(){
    document.getElementById("path").value = "";
    document.getElementById("url").value = "";
    changeProgressBar(100);
}

eel.expose(changeProgressBar);

function changeProgressBar(installedSize){
    $(".progress-bar").css("width", installedSize + "%").text(installedSize + " %");
}