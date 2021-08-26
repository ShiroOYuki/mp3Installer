async function callGetFolderPath(){
    path = await eel.getFolderPath()();
    document.getElementById("path").value = path;
}

async function callGetDefaultPath(){
    path = await eel.getDefaultPath()();
    $("#path").val(path);
}

async function callDownload(){
    resetProgressBar();
    url = document.getElementById("url").value
    path = document.getElementById("path").value;
    await eel.download(url,path)();
}

function reset(){
    document.getElementById("path").value = "";
    document.getElementById("url").value = "";
    resetProgressBar();
}

eel.expose(changeProgressBar);

function changeProgressBar(installedSize){
    $(".progress-bar").css("width", installedSize + "%").text(installedSize + " %");
}

async function callOpenOtherPage(){
    await eel.openOtherPage()();
}

function resetProgressBar(){
    $(".progress-bar").css("width", 0 + "%").text(0 + " %");
}

window.onload = function loadWindow(){
    callGetDefaultPath();
}