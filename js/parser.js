var allowed_relational_operators = [
    { id: 'equal_to', text: 'equal to' },
    { id: 'equal_to', text: 'equal to' },
    { id: 'equal_to', text: 'equals to' },
    { id: 'equal_to', text: 'equals' },
    { id: 'greater_than', text: 'greater than' },
    { id: 'greater_than', text: 'is greater than' },
    { id: 'less_than', text: 'less than' },
    { id: 'less_than', text: 'is less than' },
];

var allowed_logical_operators = [
    { id: 'and', text: 'and' },
    { id: 'or', text: 'or' },
    { id: 'not', text: 'not' },
];

var allowed_arithmetic_operators = [
    { id: 'sum', text: 'sum' },
    { id: 'difference', text: 'difference' },
    { id: 'product', text: 'product' },
    { id: 'division', text: 'division' },
];

var allowed_numbers = [
    { id: 'zero', text: 'zero' },
    { id: 'one', text: 'one' },
    { id: 'two', text: 'two' },
    { id: 'three', text: 'three' },
    { id: 'four', text: 'four' },
    { id: 'five', text: 'five' },
];

var allowed_directions = [
    { id: 'left', text: 'left' },
    { id: 'right', text: 'right' },
];

var known_commands = [
    { id: 'js_move_up', text: 'javascript move up' },
    { id: 'js_move_down', text: 'javascript move down' },
    { id: 'js_move_left', text: 'javascript move left' },
    { id: 'js_move_right', text: 'javascript move right' },

    { id: 'py_move_up', text: 'python move up' },
    { id: 'py_move_down', text: 'python move down' },
    { id: 'py_move_left', text: 'python move left' },
    { id: 'py_move_right', text: 'python move right' },

    { id: 'dexter_start', text: 'dexter start' },
    { id: 'dexter_stop', text: 'dexter stop' },
    { id: 'dexter_javascript', text: 'dexter javascript' },
    { id: 'dexter_python', text: 'dexter python' },
    { id: 'dexter_full', text: 'dexter full' },
    { id: 'dexter_clear', text: 'dexter clear' },

    { id: 'dexter_run_py', text: 'arey bhai bhai bhai' },
    { id: 'dexter_run_py', text: 'dexter run python' },
    { id: 'dexter_run_js', text: 'dexter run javascript' },

    { id: 'open_editor', text: 'open editor' },

    { id: 'dexter_undo', text: 'dexter undo' },
    { id: 'dexter_redo', text: 'dexter redo' },

    { id: 'py_insert_tab', text: 'python insert tab' },
    { id: 'py_remove_tab', text: 'python remove tab' },
    { id: 'py_auto_tab', text: 'python auto tab' },

    { id: 'js_insert_tab', text: 'javascript insert tab' },
    { id: 'js_remove_tab', text: 'javascript remove tab' },
    { id: 'js_auto_tab', text: 'javascript auto tab' },

    { id: 'py_delete_line', text: 'python delete line' },
    { id: 'py_line_start', text: 'python go to start of line' },
    { id: 'py_line_end', text: 'python go to end of line' },
    { id: 'py_del_word_before', text: 'python delete word before cursor' },
    { id: 'py_del_word_after', text: 'python delete word after cursor' },

    { id: 'js_delete_line', text: 'javascript delete line' },
    { id: 'js_line_start', text: 'javascript go to start of line' },
    { id: 'js_line_end', text: 'javascript go to end of line' },
    { id: 'js_del_word_before', text: 'javascript delete word before cursor' },
    { id: 'js_del_word_after', text: 'javascript delete word after cursor' },

    { id: 'py_select_all', text: 'python select all'},
    { id: 'py_delete_sel', text: 'python delete selected'},

    { id: 'js_select_all', text: 'javascript select all'},
    { id: 'js_delete_sel', text: 'javascript delete selected'},

    { id: 'act_speaker', text: 'activate speaker'},
    { id: 'deac_speaker', text: 'deactivate speaker'},
]

function IsKnownCommand(command) {
    for (let each of known_commands) {
        if (each.id == command) return true
    }
    return false
}

var my_commands = [
    { id: 'py_move_cursor_to_line'},
    { id: 'py_move_cursor_in_line'},
    { id: 'py_replace_selected'},

    { id: 'js_move_cursor_to_line'},
    { id: 'js_move_cursor_in_line'},
    { id: 'js_replace_selected'},


]
function isMyCommand(command) {
    for (let each of my_commands) {
        if (each.id == command) return true;
    }
    return false;
}


function setUpNlp() {
    if (window.Bravey === undefined) {
        throw "Bravey is not available";
    }

    var nlp = new Bravey.Nlp.Fuzzy();

    for (let command of known_commands) {
        nlp.addDocument(command.text, command.id, { fromFullSentence: true, expandIntent: true });
    }

    //open file
    {
        nlp.addDocument(
            'open file {file_name}',
            'open_file', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'open files {file_name}',
            'open_file', { fromFullSentence: true, expandIntent: true }
        );
    }

    //save file
    {
        nlp.addDocument(
            'save file as {file_name}',
            'save_file', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'save files as {file_name}',
            'save_file', { fromFullSentence: true, expandIntent: true }
        );
    }

    //python save file
    {
        nlp.addDocument(
            'python save file as {file_name}',
            'py_save_file', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python save files as {file_name}',
            'py_save_file', { fromFullSentence: true, expandIntent: true }
        );
    }

    //javascript save file
    {
        nlp.addDocument(
            'javascript save file as {file_name}',
            'js_save_file', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript save files as {file_name}',
            'js_save_file', { fromFullSentence: true, expandIntent: true }
        );
    }

    //py_replace_selected
    {
        nlp.addDocument(
            'python replace selected text with value {hello}',
            'py_replace_selected', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python replace selected text with text {hello}',
            'py_replace_selected', { fromFullSentence: true, expandIntent: true }
        );
    }
    //js_replace_selected
    {
        nlp.addDocument(
            'javascript replace selected text with value {hello}',
            'js_replace_selected', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript replace selected text with text {hello}',
            'js_replace_selected', { fromFullSentence: true, expandIntent: true }
        );
    }

    //py_newline
    {
        nlp.addDocument(
            'python insert new line',
            'py_new_line', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python input new line',
            'py_new_line', { fromFullSentence: true, expandIntent: true }
        );
    }
    //js_newline
    {
        nlp.addDocument(
            'javascript insert new line',
            'js_new_line', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript input new line',
            'js_new_line', { fromFullSentence: true, expandIntent: true }
        );
    }

    // declare_integer
    {
        nlp.addIntent('declare_integer', [
            { entity: 'declare_integer_var_value', id: 'declare_integer_var_value' },
        ]);
 
        let declare_integer_var_value = new Bravey.NumberEntityRecognizer('declare_integer_var_value');
        nlp.addEntity(declare_integer_var_value);

        nlp.addDocument(
            'Declare an integer {declare_integer_var_name} with value {declare_integer_var_value}',
            'declare_integer'
        );
        nlp.addDocument(
            'Declare an integer {declare_integer_var_name} value {declare_integer_var_value}',
            'declare_integer'
        );
        nlp.addDocument(
            'Create an integer {declare_integer_var_name} with value {declare_integer_var_value}',
            'declare_integer'
        );
        nlp.addDocument(
            'Create an integer {declare_integer_var_name} value {declare_integer_var_value}',
            'declare_integer'
        );
        nlp.addDocument(
            'Declare integer {declare_integer_var_name} with value {declare_integer_var_value}',
            'declare_integer'
        );
        nlp.addDocument(
            'Declare integer {declare_integer_var_name} value {declare_integer_var_value}',
            'declare_integer'
        );

        showResults(nlp.test('declare an integer alpha with value 100'));
    }

    // declare_string
    {
        nlp.addDocument(
            'Declare a string {declare_string_var_name} with text {declare_string_var_value}',
            'declare_string', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'Create string {declare_string_var_name} with text {declare_string_var_value}',
            'declare_string', { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'String {declare_string_var_name} with text {declare_string_var_value}',
            'declare_string', { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('declare an string alpha with text tomato'));
    }

    //call_function
    {
        nlp.addDocument(
            'call function {create_function_name}',
            'call_function',
            { fromFullSentence: true, expandIntent: true }
        );
        showResults(nlp.test('call function fibonacci'));
    }

    //create_function
    {
        nlp.addDocument(
            'Create a function {create_function_name} with argument {create_function_argument}',
            'create_function',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'declare a function {create_function_name} with argument {create_function_argument}',
            'create_function',
            { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('create function fibonacci with argument alpha.'));
    }

    // create for loop
    {
        nlp.addIntent('create_for', [
            { entity: 'create_loop_counts', id: 'create_loop_counts' },
        ]);

        let create_loop_counts = new Bravey.NumberEntityRecognizer('create_loop_counts');
        nlp.addEntity(create_loop_counts);

        nlp.addDocument(
            'create a for loop with variable {create_loop_variable} count {create_loop_counts}',
            'create_for'
        );
        nlp.addDocument(
            'Create a for loop with variable {create_loop_variable} for {create_loop_counts} counts',
            'create_for'
        );

        showResults(nlp.test('create a loop with variable alpha for 100'));
        showResults(nlp.test('create a for loop with variable beta for 20'));
    }

    // create while loop
    {
        nlp.addIntent('user_while', [
            { entity: 'create_loop_counts', id: 'create_loop_counts' },
        ]);

        let create_loop_counts = new Bravey.NumberEntityRecognizer('create_loop_counts');
        nlp.addEntity(create_loop_counts);

        nlp.addDocument(
            'Create a while with variable {create_loop_variable} count {create_loop_counts}',
            'user_while'
        );
        nlp.addDocument(
            'Create a while with variable {create_loop_variable} {create_loop_counts} counts',
            'user_while'
        );
        nlp.addDocument(
            'while with variable {create_loop_variable} {create_loop_counts} counts',
            'user_while'
        );

        showResults(nlp.test('create a while with variable x 100 counts'));
        showResults(nlp.test('while with variable hello 20 counts'));
    }

    //python move cursor to line
    {
        nlp.addIntent('py_move_cursor_to_line', [
            { entity: 'move_cursor_to_line_number', id: 'move_cursor_to_line_number' },
        ]);

        let move_cursor_to_line_number = new Bravey.NumberEntityRecognizer('move_cursor_to_line_number');
        nlp.addEntity(move_cursor_to_line_number);

        nlp.addDocument(
            'python move cursor to line {move_cursor_to_line_number}',
            'py_move_cursor_to_line'
        );
        nlp.addDocument(
            'python place cursor on line {move_cursor_to_line_number}',
            'py_move_cursor_to_line'
        );

        showResults(nlp.test('python move cursor to line 100'));
        showResults(nlp.test('python place cursor on line 343'));
    }
    //javascript move cursor to line
    {
        nlp.addIntent('js_move_cursor_to_line', [
            { entity: 'move_cursor_to_line_number', id: 'move_cursor_to_line_number' },
        ]);

        let move_cursor_to_line_number = new Bravey.NumberEntityRecognizer('move_cursor_to_line_number');
        nlp.addEntity(move_cursor_to_line_number);

        nlp.addDocument(
            'javascript move cursor to line {move_cursor_to_line_number}',
            'js_move_cursor_to_line'
        );
        nlp.addDocument(
            'javascript place cursor on line {move_cursor_to_line_number}',
            'js_move_cursor_to_line'
        );

        showResults(nlp.test('javascript move cursor to line 100'));
        showResults(nlp.test('javascript place cursor on line 343'));
    }

    //python move cursor in line
    {
        nlp.addIntent('py_move_cursor_in_line', [
            { entity: 'direction', id: 'direction' },
            { entity: 'character', id: 'character' },
        ]);

        let character = new Bravey.NumberEntityRecognizer('character');
        nlp.addEntity(character);

        let direction = new Bravey.StringEntityRecognizer('direction');
        for (let each of allowed_directions) {
            direction.addMatch(each.id, each.text)
        }
        nlp.addEntity(direction);

        nlp.addDocument(
            'Python move cursor {character} character {direction}',
            'py_move_cursor_in_line'
        );
        nlp.addDocument(
            'Python move cursor {character} spaces {direction}',
            'py_move_cursor_in_line'
        );

        showResults(nlp.test('Python move cursor 5 character left'));
        showResults(nlp.test('Python move cursor 5 character right'));
    }
    //javascript move cursor in line
    {
        nlp.addIntent('js_move_cursor_in_line', [
            { entity: 'direction', id: 'direction' },
            { entity: 'character', id: 'character' },
        ]);

        let character = new Bravey.NumberEntityRecognizer('character');
        nlp.addEntity(character);

        let direction = new Bravey.StringEntityRecognizer('direction');
        for (let each of allowed_directions) {
            direction.addMatch(each.id, each.text)
        }
        nlp.addEntity(direction);

        nlp.addDocument(
            'Javascript move cursor {character} character {direction}',
            'js_move_cursor_in_line'
        );
        nlp.addDocument(
            'Javascript move cursor {character} spaces {direction}',
            'js_move_cursor_in_line'
        );

        showResults(nlp.test('javascript move cursor 5 character left'));
        showResults(nlp.test('javascript move cursor 5 character right'));
    }

    // print function
    {
        nlp.addEntity(new Bravey.NumberEntityRecognizer('number'));

        nlp.addDocument(
            'print {argument}',
            'print',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'print variable {argument}',
            'print',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'print value {argument}',
            'print',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'print number {number}',
            'print',
            { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('print alpha'));
        showResults(nlp.test('print variable alpha'));
        showResults(nlp.test('print number 100'));
    }

    //python input
    {
        nlp.addEntity(new Bravey.NumberEntityRecognizer('number'));

        nlp.addDocument(
            'python insert {argument}',
            'py_input',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python insert {number}',
            'py_input',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python input {argument}',
            'py_input',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python input {number}',
            'py_input',
            { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('python input alpha'));
        showResults(nlp.test('python input 100'));
    }
    //javascript input
    {
        nlp.addEntity(new Bravey.NumberEntityRecognizer('number'));

        nlp.addDocument(
            'javascript insert {argument}',
            'js_input',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript insert {number}',
            'js_input',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript input {argument}',
            'js_input',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript input {number}',
            'js_input',
            { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('javascript input alpha'));
        showResults(nlp.test('javascript input 100'));
    }

    //python input var
    {
        nlp.addDocument(
            'python insert variable {argument}',
            'py_input_var',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python insert value {argument}',
            'py_input_var',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python input variable {argument}',
            'py_input_var',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'python input value {argument}',
            'py_input_var',
            { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('python input variable alpha'));
        showResults(nlp.test('python input value Hello World'));
    }
    //javascript input var
    {
        nlp.addDocument(
            'javascript insert variable {argument}',
            'js_input_var',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript insert value {argument}',
            'js_input_var',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript input variable {argument}',
            'js_input_var',
            { fromFullSentence: true, expandIntent: true }
        );
        nlp.addDocument(
            'javascript input value {argument}',
            'js_input_var',
            { fromFullSentence: true, expandIntent: true }
        );

        showResults(nlp.test('javascript input variable alpha'));
        showResults(nlp.test('javascript input value Hello World'));
    }
    return nlp;
}

function showResults(result) {
    if (result) {
        for (let entity of result.entities) {
            console.log(entity.id, entity.value);
        }
    } else {
        console.log('something failed here')
    }
}
