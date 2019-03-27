function js_handler(result,text) {
    const js_handler_literal = {
        "declare_integer": declare_integer_js,
        "declare_string": declare_string_js,
        "create_function": create_function_js,
        "create_for": create_for_loop_js,
        "user_while": create_user_while_js,
        "js_move_cursor_to_line":move_cursor_to_line_js,
        "js_move_cursor_in_line":move_cursor_in_line_js,
        "print": print_js,
        "js_input": input_js,
        "js_new_line": new_line_js,
        "js_replace_selected": replace_selected_js,
    };

    let entity = result.intent;
    let function_handler = js_handler_literal[entity];
    let entities = {};
    for (let i of result.entities) {
        entities[i.id] = i;
    }
    return function_handler(entities,text);
}

function py_handler(result,text) {
    const py_handler_literal = {
        "declare_integer": declare_integer_py,
        "declare_string": declare_string_py,
        "create_function": create_function_py,
        "create_for": create_for_loop_py,
        "user_while": create_user_while_py,
        "py_move_cursor_to_line":move_cursor_to_line_py,
        "py_move_cursor_in_line":move_cursor_in_line_py,
        "print": print_py,
        "py_input": input_py,
        "py_new_line": new_line_py,
        "py_replace_selected": replace_selected_py,
    };

    let entity = result.intent;
    let function_handler = py_handler_literal[entity];
    let entities = {};
    for (let i of result.entities) {
        entities[i.id] = i;
    }
    return function_handler(entities,text);
}

function declare_integer_js(entities,text) {
    const name = varIdentifier(text);
    const value = entities["declare_integer_var_value"].value;
    if(name !== undefined && value !== undefined){
        return ({
            intent: "insert",
            entity: `var ${name} = ${value};\n`,
            movement_callback: []
        });
    } else {
        return;
    }
}
function declare_integer_py(entities,text) {
    const name = varIdentifier(text);
    const value = entities["declare_integer_var_value"].value;
    if(name !== undefined && value !== undefined){
        return ({
            intent: "insert",
            entity: `${name} = ${value}\n`,
            movement_callback: []
        });
    } else {
        return;
    }
}

function declare_string_js(entities,text){
    const name = varIdentifier(text);
    const value = valueIdentifier(text);
    if(name !== undefined && value !== undefined){
        return ({
            intent: "insert",
            entity: `var ${name} = "${value};"\n`,
            movement_callback: []
        });
    } else {
        return;
    }
}
function declare_string_py(entities,text){
    const name = varIdentifier(text);
    const value = valueIdentifier(text);
    if(name !== undefined && value !== undefined){
        return ({
            intent: "insert",
            entity: `${name} = "${value}"\n`,
            movement_callback: []
        });
    } else {
        return;
    }
}

function create_function_js(entities,text) {
    const name = varIdentifier(text);
    const arg = valueIdentifier(text);
    if(name !== undefined && arg !== undefined){
        return ({
            intent: "insert",
            entity: `function ${name}(${arg}){\n\n}`,
            movement_callback: []
    });
    } else {
        return;
    }
}
function create_function_py(entities,text) {
    const name = varIdentifier(text);
    const arg = valueIdentifier(text);
    if(name !== undefined && arg !== undefined){
        return ({
            intent: "insert",
            entity: `def ${name}(${arg}):\n\t`,
            movement_callback: []
    });
    } else {
        return;
    }
}

function create_for_loop_js(entities,text) {
    const upper_bound = entities['create_loop_counts'].value;
    const name = varIdentifier(text);
    if(name !== undefined){
        return ({
            intent: "insert",
            entity: `for(${name}=0;${name}<${upper_bound};${name}++){\n\n}`,
            movement_callback: []
        });
    } else {
        return;
    }
}
function create_for_loop_py(entities,text) {
    const upper_bound = entities['create_loop_counts'].value;
    const name = varIdentifier(text);
    if(name !== undefined){
        return ({
            intent: "insert",
            entity: `for ${name} in range(${upper_bound}):\n\t`,
            movement_callback: []
        });
    } else {
        return;
    }
}

function create_user_while_js(entities,text) {
    const upper_bound = entities['create_loop_counts'].value;
    const name = varIdentifier(text);
    if(name !== undefined){
        return ({
            intent: "insert",
            entity: `while (${name}<${upper_bound}){\n\t${name}++;\n\n}`,
            movement_callback: []
        });
    } else {
        return;
    }
}
function create_user_while_py(entities,text) {
    const upper_bound = entities['create_loop_counts'].value;
    const name = varIdentifier(text);
    if(name !== undefined){
        return ({
            intent: "insert",
            entity: `while (${name}<${upper_bound}):\n\t${name}++\n\t`,
            movement_callback: []
        });
    } else {
        return;
    }
}

function move_cursor_in_line_js(entities,text) {
    const character = entities['character'].value;
    const direction = entities['direction'].value;
    if(direction == 'left') {
        return ({
            intent: "move",
            entity: character,
            entityd: "left"
        });
    } else {
        return ({
            intent: "move",
            entity: character,
            entityd: "right"
        });
    }
}
function move_cursor_in_line_py(entities,text) {
    const character = entities['character'].value;
    const direction = entities['direction'].value;
    if(direction == 'left') {
        return ({
            intent: "move",
            entity: character,
            entityd: "left"
        });
    } else {
        return ({
            intent: "move",
            entity: character,
            entityd: "right"
        });
    }
}

function move_cursor_to_line_js(entities,text) {
    const lineno = entities['move_cursor_to_line_number'].value;
    return ({
        intent: "move",
        entity: lineno
    });
}
function move_cursor_to_line_py(entities,text) {
    const lineno = entities['move_cursor_to_line_number'].value;
    return ({
        intent: "move",
        entity: lineno
    });
}

function print_js(entities,text) {
    const arg = (entities["number"] === undefined) ? (valueIdentifier(text)) : (entities['number'].value);
    if(arg !== undefined){
        return ({
            intent: "insert",
            entity: `console.log(${arg});\n`
        });
    } else {
        return;
    }
}
function print_py(entities,text) {
    const arg = (entities["number"] === undefined) ? (valueIdentifier(text)) : (entities['number'].value);
    if(arg !== undefined){
        return ({
            intent: "insert",
            entity: `print(${arg})\n`
        });
    } else {
        return;
    }
}

function input_js(entities,text) {
    const arg = (entities["number"] === undefined) ? (inputIdentifier(text)) : (entities['number'].value);
    if(arg !== undefined){
        return ({
        intent: "insert",
        entity: `${arg}`
    });
    } else {
        return;
    }
}
function input_py(entities,text) {
    const arg = (entities["number"] === undefined) ? (inputIdentifier(text)) : (entities['number'].value);
    if(arg !== undefined){
        return ({
        intent: "insert",
        entity: `${arg}`
    });
    } else {
        return;
    }
}

function new_line_js(entities,text) {
    return({
        intent : "insert",
        entity : `\n`
    });
}
function new_line_py(entities,text) {
    return({
        intent : "insert",
        entity : `\n`
    });
}

function replace_selected_js(entities,text) {
    const arg = valueIdentifier(text);
    if(arg !== undefined){
        return({
            intent : "insert",
            entity : `${arg}`
        });
    }
}
function replace_selected_py(entities,text) {
    const arg = valueIdentifier(text);
    if(arg !== undefined){
        return({
            intent : "insert",
            entity : `${arg}`
        });
    }
}