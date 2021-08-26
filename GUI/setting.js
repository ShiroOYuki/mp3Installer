async function callGetDefaultPath(){
    path = await eel.getDefaultPath()();
    $("#path").val(path);
}

async function callSavePath(){
    path = $("#path").val();
    await eel.savePath(path)();
    callGetDefaultPath();
}

function closeWindow(){
    window.close();
}
