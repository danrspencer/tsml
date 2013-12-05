/// <reference path="Ref.d.ts" />

import fs = require('fs');

import Compile = require('Compile');

class App {

    constructor(private _fs: typeof fs,
                private _compile: Compile) {

    }

    public run(paths: string[]) {
        paths.forEach((path: string) => {

            var fileStat = this._fs.statSync(path);

            if (fileStat.isFile() === true) {
                this._compile.compile(path);
            } else {
                var dirContent = this._fs.readdirSync(path);

                dirContent.forEach((dirItem, index) => {
                    dirContent[index] = path + '/' + dirItem;
                });

                this.run(dirContent);
            }
        });
    }
}

export = App;