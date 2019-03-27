function varIdentifier(text){
    var rawtext = text.split(" ");
    //console.log(typeof rawtext);
    for(var i = 0; i<rawtext.length; i++){
        if(rawtext[i].trim() == 'integer' || rawtext[i].trim() == 'variable' || rawtext[i].trim() == 'string' || rawtext[i].trim() == 'function'){
            return rawtext[i+1].trim();
        }
    }
}

function valueIdentifier(text){
    var rawtext = text.split(" ");
    for(var i = 0; i<rawtext.length; i++){
        if(rawtext[i].trim() == 'value' || rawtext[i].trim() == 'argument' || rawtext[i].trim() == 'text' || rawtext[i].trim() == 'print' || rawtext[i].trim() == 'input' || rawtext[i].trim() == 'insert'){
            return rawtext[i+1].trim();
        }
    }
}

function inputIdentifier(text){
    var rawtext = text.split(" ");
    for(var i = 0; i<rawtext.length; i++){
        if(rawtext[i].trim() == 'input' || rawtext[i].trim() == 'insert'){
            var temp = rawtext[i+1].trim();
            if(temp == "multiply"){
                temp = "*";
            } else if(temp == "divide"){
                temp = "/";
            } else if(temp == "add"){
                temp = "+";
            } else if(temp == "sub"){
                temp = "-";
            } else if(temp == "mod"){
                temp = "%";
            }
            return temp;
        }
    }
}