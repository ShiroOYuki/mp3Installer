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

async function callGetKbps(){
    console.log("callGetKbps");
    kbps = await eel.getKbps()();
    console.log(kbps);
    $("input[type=radio]")[kbps].checked = true;
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

async function callIsAutosave(){
    autosave = await eel.IsAutosave()();
    return autosave;
}

async function printOnCmd(index){
    await eel.jsPrint(index)();
}

function saveSetting(){
    callSaveIsAutosave();
    callSavePath();
    kbps = $('input[name=btnradio]:checked').val();
    if(kbps !== "" && kbps !== null){
        console.log(kbps);
        printOnCmd(kbps)
        callChangeKbps(kbps);
    }
}

async function callSavePath(){
    path = $("#path").val();
    if(path !== "" && path !== null){
        printOnCmd(path)
        await eel.savePath(path)();
    }
}

async function callChangeKbps(kbps){
    console.log("callChangeKbps");
    await eel.changeKbps(kbps)();
}

async function callSaveIsAutosave(){
    console.log("callSaveIsAutosave");
    autosave = $("#Autosave").is(":checked")
    await eel.saveIsAutosave(autosave)();
}

async function defaultAutosave(){
    autosave = await eel.IsAutosave()();
    $("#Autosave").prop('checked', autosave);
}

window.onload = function loadWindow(){
    callGetDefaultPath();
    callGetKbps();
    defaultAutosave();
}

window.onbeforeunload = function closeWindow() {
    printOnCmd("Close "+document.title);
    printOnCmd($("#Autosave").is(":checked"))
    if($("#Autosave").is(":checked") && document.title === "Setting"){
        saveSetting();
    }
};
