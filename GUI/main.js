async function callGetFolderPath(){
    console.log("callGetFolderPath");
    path = await eel.getFolderPath()();
    if(path !== ""){
        document.getElementById("path").value = path;
    }
}

async function callGetDefaultPath(){
    console.log("callGetDefaultPath");
    path = await eel.getDefaultPath()();
    $("#path").val(path);
}

async function callDownload(){
    console.log("callDownload");
    resetProgressBar();
    changeProgressBar(1);
    url = document.getElementById("url").value
    path = document.getElementById("path").value;
    await eel.download(url,path)();
}

async function reset(){
    console.log("reset");
    document.getElementById("path").value = await eel.getDefaultPath()();
    document.getElementById("url").value = "";
    resetProgressBar();
}

async function callOpenOtherPage(){
    console.log("callOpenOtherPage");
    await eel.openOtherPage()();
}

eel.expose(changeProgressBar);
eel.expose(downloadComplete);

function changeProgressBar(installedSize){
    console.log("changeProgressBar");
    $(".progress-bar").css("width", installedSize + "%").text(installedSize + " %");
}

function resetProgressBar(){
    console.log("resetProgressBar");
    $(".progress-bar").css("width", 0 + "%").text(0 + " %");
}

function alertHidden(){
    console.log("alertHidden");
    $("#successSaveAlert").fadeOut()
}

function showAlert(){
    console.log("showAlert");
    $("#successSaveAlert").fadeIn()
}

function downloadCompleteProgress(){
    console.log("downloadCompleteProgress");
    resetProgressBar();
    alertHidden();
}

function downloadComplete(){
    console.log("downloadComplete");
    $(".progress-bar").text("Complete!");
    showAlert();
    var timer = setTimeout(downloadCompleteProgress,3000);
}


window.onload = function loadWindow(){
    callGetDefaultPath();
}