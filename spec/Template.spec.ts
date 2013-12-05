import jts = require('jts'); var spyOf = jts.spyOf, setSpy = jts.setSpy;

import child_process = require('child_process');
import fs = require('fs');

import Template = require('../source/Template');

describe('Template', () => {

    var template: Template;

    beforeEach(() => {

        template = new Template();
    });

    it('returns the compiled template', () => {

        var result = template.templatify('<html>Stuff</html>');

        var expected = 'module file {\n' +
                       '    export var html = \'<html>Stuff</html>\'\n' +
                       '}';

        expect(result).toEqual(expected);
    });

//    it('delegates to child_process to get a list of all files if path is a folder', () => {
//        setSpy(fsSpy.statSync).toReturn({
//
//        })
//
//        compile.compile('pathGoesHere');
//
//        expect(fsSpy.statSync).toHaveBeenCalledWith('pathGoesHere');
//    });

});