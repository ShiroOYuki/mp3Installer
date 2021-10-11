async function callGetFolderPath(){
    console.log("callGetFolderPath")
    path = await eel.getFolderPath()();
    if(path !== ""){
        document.getElementById("path").value = path;
    }
}

async function callGetDefaultPath(){
    console.log("callGetDefaultPath")
    path = await eel.getDefaultPath()();
    $("#path").val(path);
}

async function callDownload(){
    console.log("callDownload") 
    resetProgressBar();
    url = document.getElementById("url").value
    path = document.getElementById("path").value;
    await eel.download(url,path)();
}

async function reset(){
    console.log("reset") 
    document.getElementById("path").value = await eel.getDefaultPath()();
    document.getElementById("url").value = "";
    resetProgressBar();
}

eel.expose(changeProgressBar);

function changeProgressBar(installedSize){
    console.log("changeProgressBar") 
    $(".progress-bar").css("width", installedSize + "%").text(installedSize + " %");
}

async function callOpenOtherPage(){
    console.log("callOpenOtherPage") 
    await eel.openOtherPage()();
}

function resetProgressBar(){
    console.log("resetProgressBar") 
    $(".progress-bar").css("width", 0 + "%").text(0 + " %");
}

window.onload = function loadWindow(){
    callGetDefaultPath();
}