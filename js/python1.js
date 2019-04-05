function varIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'integer' || rawtext[i].trim() == 'variable' || rawtext[i].trim() == 'string' || rawtext[i].trim() == 'function') {
            var name = rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                if (rawtext[j].trim() == 'with' || rawtext[j].trim() == 'count' || rawtext[j].trim() == 'value' || rawtext[j].trim() == 'text') {
                    break;
                }
                name = name + rawtext[j].trim().charAt(0).toUpperCase() + rawtext[j].slice(1);
            }
            return name;
        }
    }
}

function valueIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'value' || rawtext[i].trim() == 'argument' || rawtext[i].trim() == 'text' || rawtext[i].trim() == 'print') {
            return rawtext[i + 1].trim();
        }
    }
}

function textIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'value' || rawtext[i].trim() == 'text') {
            var value = rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                value = value + " " + rawtext[j].trim();
            }
            return value;
        }
    }
}

function argumentIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'argument') {
            var value = rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                value = value + ", " + rawtext[j].trim();
            }
            return value;
        }
    }
}

function inputIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'input' || rawtext[i].trim() == 'insert') {
            var temp = rawtext[i + 1].trim();
            if (temp == "multiply") {
                temp = "*";
            } else if (temp == "divide") {
                temp = "/";
            } else if (temp == "add") {
                temp = "+";
            } else if (temp == "sub") {
                temp = "-";
            } else if (temp == "mod") {
                temp = "%";
            } else if (temp == "equal" || temp == "equals") {
                temp = "=";
            }
            return temp;
        }
    }
}

function inputVarIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'input' || rawtext[i].trim() == 'insert') {
            var temp = rawtext[i + 1].trim();
            if (temp == "variable") {
                var name = rawtext[i + 2].trim();
                for (var j = i + 3; j < rawtext.length; j++) {
                    name = name + rawtext[j].trim().charAt(0).toUpperCase() + rawtext[j].slice(1);
                }
                return name;
            } else if (temp == "value") {
                var name = rawtext[i + 2].trim();
                for (var j = i + 3; j < rawtext.length; j++) {
                    name = name + " " + rawtext[j].trim();
                }
                return name;
            }
        }
    }
}

function fileIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'as') {
            var name = rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                name = name + rawtext[j].trim().charAt(0).toUpperCase() + rawtext[j].slice(1);
            }
            return name;
        }
    }
}

function fileOpenIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 0; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'file' || rawtext[i].trim() == 'files') {
            var name = rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                name = name + rawtext[j].trim().charAt(0).toUpperCase() + rawtext[j].slice(1);
            }
            return name;
        }
    }
}

function printIdentifier(text) {
    var rawtext = text.split(" ");
    for (var i = 1; i < rawtext.length; i++) {
        if (rawtext[i].trim() == 'variable') {
            var name = rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                name = name + rawtext[j].trim().charAt(0).toUpperCase() + rawtext[j].slice(1);
            }
            return name;
        } else if (rawtext[i].trim() == 'value' || rawtext[i].trim() == 'string') {
            var name = "\""+rawtext[i + 1].trim();
            for (var j = i + 2; j < rawtext.length; j++) {
                name = name + " " + rawtext[j].trim();
            }
            name = name + "\"";
            return name;
        } else if (rawtext[i].trim() == 'number') {
            var name = rawtext[i + 1].trim();
            return name;
        } else {
            return 0;
        }
    }
}