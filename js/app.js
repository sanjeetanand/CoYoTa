var nlp = null;
var mic = null;

var python = true;
var javascript = true;

var dexterIsRunning = true;

function newApp() {
    nlp = setUpNlp();
    mic = new Mic(micResponseHandler(nlp, python, javascript));
}

function typeEffect(element, speed) {
    var text = $(element).text();
    $(element).html('');

    var i = 0;
    var timer = setInterval(function () {
        if (i < text.length) {
            $(element).append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}


function micResponseHandler(nlp, python, javascript) {
    return (text) => {
        console.log('response handler says', text);
        let entities = nlp.test(text);
        if (!entities) {
            return;
        }
        if (IsKnownCommand(entities.intent)) {
            commandHandlers(entities.intent);
            return;
        }

        if (isMyCommand(entities.intent)) {
            myHandlers(entities,text);
            return;
        }

        if (!dexterIsRunning) {
            return;
        }
        if(entities.intent.startsWith("py")){
            let py_result = py_handler(entities,text);
<<<<<<< HEAD
            if(py_result.intent == "save"){
                saveDexter(py_result.entity);
            } else {
                if (python) {
                    _insertTextAtCursor(editor2, py_result.entity);   
                }
                speak(py_result.entity);
            }  
=======
            if (python) {
                _insertTextAtCursor(editor2, py_result.entity);   
            }
>>>>>>> dfe0ee14fd9b48554b1d8e7f5ba4e84e7af83e47
        } else if(entities.intent.startsWith("js")){
            let js_result = js_handler(entities,text);
            if (javascript) {
                _insertTextAtCursor(editor1, js_result.entity); 
            }
<<<<<<< HEAD
            speak(js_result.entity);
=======
>>>>>>> dfe0ee14fd9b48554b1d8e7f5ba4e84e7af83e47
        } else {
            let py_result = py_handler(entities,text);
            let js_result = js_handler(entities,text);
            if (javascript) {
                _insertTextAtCursor(editor1, js_result.entity); 
            }
            if (python) {
                _insertTextAtCursor(editor2, py_result.entity);   
            }
<<<<<<< HEAD
            speak(py_result.entity);
=======
>>>>>>> dfe0ee14fd9b48554b1d8e7f5ba4e84e7af83e47
        }

        

        $('#text').html(text);
        typeEffect($('#text'), 75);
    };
}

function runPython() {
    let content = editor2.getValue()

    let showPyResult = (result) => {
        $('#pyfile').html('output')
        editor2.setValue(result.out.replace('b\'', ''));
    };
    $.ajax({
        url: 'http://localhost:5000/compile',
        type: 'POST',
        crossDomain: true,
        data: { content:content },
        success: showPyResult,
        error: showPyResult,
    });
}

function runJavascript() {
    let content = editor1.getValue();

    let showJsResult = (result) => {
        $('#jsfile').html('output');
        console.log(result);
        editor1.setValue(result.out.replace('b\'', ''));
    }
    $.ajax({
        url: 'http://localhost:5000/js',
        type: 'POST',
        crossDomain: true,
        data: { content:content },
        success: showJsResult,
        error: showJsResult,
    });
}

function saveDexter(file_name) {
    let content = editor2.getValue();
    $.ajax({
        url: 'http://localhost:5000/write',
        type: 'POST',
        crossDomain: true,
        data: { content:content,file_name:file_name},
    });
}

function myHandlers(entities,text){
    if (entities.intent == 'py_move_cursor_to_line') {
        if (python) {
            let py_result = py_handler(entities,text);
            _moveToLine(editor2, py_result.entity);
        }
    } else if (entities.intent == 'py_move_cursor_in_line') {
        if (python) {
            let py_result = py_handler(entities,text);
            if (py_result.entityd == 'left')
                _moveChLeft(editor2, py_result.entity);
            else if (py_result.entityd == 'right')
                _moveChRight(editor2, py_result.entity);
        }
    } else if (entities.intent == 'py_replace_selected') {
        if(python){
            let py_result = py_handler(entities,text);
            _replaceSelected(editor2,py_result.entity);
        }
    }


    else if (entities.intent == 'js_move_cursor_to_line') {
        if (javascript) {
            let js_result = js_handler(entities,text);
            _moveToLine(editor1, js_result.entity);
        }
    } else if (entities.intent == 'js_move_cursor_in_line') {
        if (javascript) {
            let js_result = js_handler(entities,text);
            if (js_result.entityd == 'left')
                _moveChLeft(editor1, js_result.entity);
            else if (js_result.entityd == 'right')
                _moveChRight(editor1, js_result.entity);
        }
    } else if (entities.intent == 'js_replace_selected') {
        if(javascript){
            let js_result = js_handler(entities,text);
            _replaceSelected(editor1,js_result.entity);
        }
    }
}

function commandHandlers(command) {

    if (command == 'dexter_start') {
        dexterIsRunning = true;
    } else if (command == 'dexter_stop') {
        dexterIsRunning = false;
    } else if (command === 'dexter_javascript'){
        python = false;
        javascript = true;
        $('#editorspane').css('grid-template-columns', '100% 0% 0%');
    } else if (command === 'dexter_python'){
        python = true;
        javascript = false;
        $('#editorspane').css('grid-template-columns', '0% 0% 100%');
    } else if (command === 'dexter_full'){
        python = true;
        javascript = true;
        $('#editorspane').css('grid-template-columns', '49.75% 0.5% 49.75%');
    } else if (command == 'dexter_run') {
        runPython();
        runJavascript();
    } else if (command == 'dexter_run_py') {
        runPython();
    } else if (command == 'dexter_run_js') {
        runJavascript();
    } else if (command == 'dexter_clear') {
        editor2.setValue('');
        $('#jsfile').html('index.js');
        $('#pyfile').html('index.py');
        editor1.setValue('');
    } else if (command == 'dexter_redo') {
        _undo();
    } else if (command == 'dexter_redo') {
        _redo();
    } else if (command == 'act_speaker') {
        speaker();
    } else if (command == 'deac_speaker') {
        mutter();
    }
    
    
    else if (command == 'py_insert_tab') {
		if (python) _insertTabAtCursor(editor2);
    } else if (command == 'py_auto_tab') {
        if (python) _autoTabAtCursor(editor2);
    } else if (command == 'py_remove_tab') {
        if (python) _removeTabAtCursor(editor2);
    } else if (command == 'py_move_left') {
        if (python) _wmoveleft(editor2);
    } else if (command == 'py_move_right') {
        if (python) _wmoveright(editor2);
    } else if (command == 'py_move_up') {
        if (python) _lineUp(editor2);
    } else if (command == 'py_move_down') {
        if (python) _lineDown(editor2);
    } else if (command == 'py_delete_line') {
        if (python) _deleteLine(editor2);
    } else if (command == 'py_del_word_before') {
        if (python) _deleteWordBefore(editor2);
    } else if (command == 'py_del_word_after') {
        if (python) _deleteWordAfter(editor2);
    } else if (command == 'py_line_start') {
        if (python) _startOfLine(editor2);
    } else if (command == 'py_line_end') {
        if (python) _endOfLine(editor2);
    } else if (command == 'py_select_all') {
        if (python) _selectAll(editor2);
    } else if (command == 'py_delete_sel') {
        if (python) _deleteSelected(editor2);
    }
    
    else if (command == 'js_insert_tab') {
		if (javascript) _insertTabAtCursor(editor1);
    } else if (command == 'js_auto_tab') {
        if (javascript) _autoTabAtCursor(editor1);
    } else if (command == 'js_remove_tab') {
        if (javascript) _removeTabAtCursor(editor1);
    } else if (command == 'js_move_left') {
        if (javascript) _wmoveleft(editor1);
    } else if (command == 'js_move_right') {
        if (javascript) _wmoveright(editor1);
    } else if (command == 'js_move_up') {
        if (javascript) _lineUp(editor1);
    } else if (command == 'js_move_down') {
        if (javascript) _lineDown(editor1);
    } else if (command == 'js_delete_line') {
        if (javascript) _deleteLine(editor1);
    } else if (command == 'js_del_word_before') {
        if (javascript) _deleteWordBefore(editor1);
    } else if (command == 'js_del_word_after') {
        if (javascript) _deleteWordAfter(editor1);
    } else if (command == 'js_line_start') {
        if (javascript) _startOfLine(editor1);
    } else if (command == 'js_line_end') {
        if (javascript) _endOfLine(editor1);
    } else if (command == 'js_select_all') {
        if (javascript) _selectAll(editor1);
    } else if (command == 'js_delete_sel') {
        if (javascript) _deleteSelected(editor1);
    }
    
}
