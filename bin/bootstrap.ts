/// <reference path="../components/DefinitelyTyped/commander/commander.d.ts" />

import commander = require('commander');
import fs = require('fs');

import App = require('../source/App');
import Compile = require('../source/Compile');
import Template = require('../source/Template');

function bootstrap(version: string, argv: string[]) {

    commander
        .version(version)
        .parse(argv);

    var items = commander['args'];

    var template = new Template();
    var compile = new Compile(fs, template);
    var app = new App(fs, compile);

    app.run(items);
}

export = bootstrap;