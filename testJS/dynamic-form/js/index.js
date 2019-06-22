const formData = {
    "riceprev":  ["CODICEBUS","CODICEFRAME","CODICEEVENTO","DSNOME","DSCOGNOME","DTSOTTDA","DTSOTTA","DSPROD","NUPREV"],
    "ricepol":  ["CODICEBUS","CODICEFRAME","CODICEEVENTO","DSNOME","DSCOGNOME","DTSOTTDA","DTSOTTA","DSPROD","CDFISC","NUPROP"],
}

const doZip = (array1, array2) => array1.map(function(e, i) { return [e, array2[i]]; });

const upgradeForm = function(campi,str){
    removeInputs();
    doZip(campi,str.split(";")).map(createInput).forEach(function(e){
        appendInput(e);
    }, this);
}

const processStr = function(key,inputStr){
    upgradeForm(formData[key],inputStr);
}

const createInput = ([name, value])=>{
    let elemInput = document.createElement("input");
    elemInput.setAttribute("type", "hidden");
    elemInput.setAttribute("id", "cerca" + name);
    elemInput.setAttribute("name", name);
    elemInput.setAttribute("value", value == "NO" ? "" : value);
    return elemInput;
}

const appendInput= function(elemInput){
    document.getElementById("falseForm").appendChild(elemInput);
}

const removeInputs = function(){
    let formNode = document.getElementById("falseForm");
    while (formNode.firstChild) {
        formNode.removeChild(formNode.firstChild);
    }
}
