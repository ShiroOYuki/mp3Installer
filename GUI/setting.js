async function callGetDefaultPath(){
    path = await eel.getDefaultPath()();
    $("#path").val(path);
}

async function callSavePath(){
    path = $("#path").val();
    await eel.savePath(path)();
    callGetDefaultPath();
    saveAlert();
}

function closeWindow(){
    window.close();
}

function saveAlert(){
    $("#successSaveAlert").fadeIn()
}

function alertHidden(){
    $("#successSaveAlert").fadeOut()
}

window.onload = function loadWindow(){
    callGetDefaultPath();
}