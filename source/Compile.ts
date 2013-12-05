/// <reference path="Ref.d.ts" />

import child_process = require('child_process');
import fs = require('fs');

import Template = require('Template');

class Compile {

    constructor(private _fs: typeof fs,
                private _template: Template) {

    }

    public compile(path: string) {

        var content = this._fs.readFileSync(path, { encoding: 'utf8' });
        var compiled = this._template.templatify(content);

        console.log('Writing: ' + path + '.ts');

        this._fs.writeFileSync(path + '.ts', compiled);
    }
}

export = Compile;