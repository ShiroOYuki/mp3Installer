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

async function callChangeKbps(kbps){
    console.log("callChangeKbps");
    await eel.changeKbps(kbps)();
}

function saveSetting(){
    callSavePath();
    kbps = $('input[name=btnradio]:checked').val();
    console.log(kbps);
    callChangeKbps(kbps);
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