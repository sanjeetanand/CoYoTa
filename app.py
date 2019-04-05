from flask import Flask, request, jsonify
from judge import runProcess
from flask_cors import CORS


app = Flask('dexter')
CORS(app)


@app.route('/compile', methods=['POST'])
def compile():
    content = r'' + request.form['content']
    # with open('my.py', 'w') as f:
    #     print(exec(content))
    with open('intermediate.py', 'w') as f:
        # print(repr(content).replace("'", ''))
        # new_content = content.replace("'", '')
        for i in content:
            f.write(i)

        # f.write(repr(content).replace("", ''))

    outBuf, errBuf = runProcess(['python3', 'intermediate.py'])
    return jsonify({'out': str(outBuf), 'err': str(errBuf)})

@app.route('/js', methods=['POST'])
def interpret():
    content = r'' + request.form['content']
    # with open('my.py', 'w') as f:
    #     print(exec(content))
    with open('intermediate.js', 'w') as f:
        # print(repr(content).replace("'", ''))
        # new_content = content.replace("'", '')
        for i in content:
            f.write(i)

        # f.write(repr(content).replace("", ''))

    outBuf, errBuf = runProcess(['node', 'intermediate.js'])
    return jsonify({'out': str(outBuf), 'err': str(errBuf)})

@app.route('/writepy', methods=['POST'])
def writepy():
    contentpy = r'' + request.form['contentpy']
    file_name = r'' + request.form['file_name']
    with open(file_name+'.py', 'w') as f:
        for i in contentpy:
            f.write(i)
        f.close()
    return

@app.route('/writejs', methods=['POST'])
def writejs():
    contentjs = r'' + request.form['contentjs']
    file_name = r'' + request.form['file_name']
    with open(file_name+'.js', 'w') as f:
        for i in contentjs:
            f.write(i)
        f.close()
    return

@app.route('/openEditorJS', methods=['POST'])
def openEditorJS():
    resultjs = ""
    with open('intermediate.js', 'r') as f:
        for i in f:
            resultjs = resultjs + i
        f.close()
    return jsonify({'out': resultjs , 'err': 'error_occured'})

@app.route('/openEditorPY', methods=['POST'])
def openEditorPY():
    resultpy = ""
    with open('intermediate.py', 'r') as f:
        for i in f:
            resultpy = resultpy + i
        f.close()
    return jsonify({'out': resultpy , 'err': 'error_occured'})

@app.route('/openFilePY', methods=['POST'])
def openFilePY():
    file_name = r'' + request.form['file_name']
    resultpy = ""
    with open(file_name+'.py', 'r') as f:
        for i in f:
            resultpy = resultpy + i
        f.close()
    return jsonify({'out': resultpy , 'err': 'error_occured'})

@app.route('/openFileJS', methods=['POST'])
def openFileJS():
    file_name = r'' + request.form['file_name']
    resultjs = ""
    with open(file_name+'.js', 'r') as f:
        for i in f:
            resultjs = resultjs + i
        f.close()
    return jsonify({'out': resultjs , 'err': 'error_occured'})

if __name__ == '__main__':
    app.run(debug=True)
