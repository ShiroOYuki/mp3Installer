async function _askFolderDialog(){
    path = await eel.askFolderDialog()();
    if(path !== ""){
        document.getElementById("path").value = path;
    }
}

async function _askDefaultPath(){
    path = await eel.askDefaultPath()();
    $("#path").val(path);
}

async function _downloadMp3(){
    resetProgressBar();
    changeProgressBar(1);
    url = document.getElementById("url").value
    path = document.getElementById("path").value;
    await eel.downloadMp3(url,path)();
}

async function _askKbps(){
    kbps = await eel.askKbps()();
    $("input[type=radio]")[kbps].checked = true;
}

async function _newPage(){
    await eel.newPage()();
}

async function reset(){
    document.getElementById("path").value = await eel.askDefaultPath()();
    document.getElementById("url").value = "";
    resetProgressBar();
}

async function _isAutosave(){
    autosave = await eel.isAutosave()();
    return autosave;
}

async function printOnCmd(index){
    await eel.jsPrint(index)();
}

async function _setDefaultPath(){
    path = $("#path").val();
    if(path !== "" && path !== null){
        await eel.setDefaultPath(path)();
        _askDefaultPath();
        saveAlert();
    }
}

async function _setDefaultKbps(kbps){
    await eel.setDefaultKbps(kbps)();
}

async function _setAutosave(){
    autosave = $("#Autosave").is(":checked")
    await eel.setAutosave(autosave)();
}

async function _isAutosave(){
    autosave = await eel.isAutosave()();
    $("#Autosave").prop('checked', autosave);
}

// ----------------------------------------------

function changeProgressBar(installedSize){
    $(".progress-bar").css("width", installedSize + "%").text(installedSize + " %");
}

function resetProgressBar(){
    $(".progress-bar").css("width", 0 + "%").text(0 + " %");
}

function alertHidden(){
    $("#successSaveAlert").fadeOut()
}

function showAlert(){
    $("#successSaveAlert").fadeIn()
}

function downloadCompleteProgress(){
    resetProgressBar();
    alertHidden();
}

function downloadComplete(){
    $(".progress-bar").text("Complete!");
    showAlert();
    var timer = setTimeout(downloadCompleteProgress,3000);
}

function saveSetting(){
    _setAutosave();
    _setDefaultPath();
    kbps = $('input[name=btnradio]:checked').val();
    if(kbps !== "" && kbps !== null){
        _setDefaultKbps(kbps);
    }
    autosave = $("#Autosave").is(":checked");
    _setAutosave(autosave);
}

function saveAlert(){
    $("#successSaveAlert").fadeIn()
}

function alertHidden(){
    $("#successSaveAlert").fadeOut()
}

function closeWindow(){
    window.close();
}

eel.expose(changeProgressBar);
eel.expose(downloadComplete);

window.onload = function loadWindow(){
    _askDefaultPath();
    _askKbps();
    _isAutosave();
}

window.onbeforeunload = function closeWindow() {
    if($("#Autosave").is(":checked") && document.title === "Setting"){
        saveSetting();
    }
};
