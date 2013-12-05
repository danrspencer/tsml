import jts = require('jts'); var spyOf = jts.spyOf, setSpy = jts.setSpy;

import child_process = require('child_process');
import fs = require('fs');

import Compile = require('../source/Compile');
import Template = require('../source/Template');

describe('Compile', () => {

    var childProcessSpy: typeof child_process;
    var fsSpy: typeof fs;

    var templateSpy: Template;

    var compile: Compile;

    beforeEach(() => {
        childProcessSpy = jasmine.createSpyObj<typeof child_process>('childProcessSpy', [
            ''
        ]);

        fsSpy = jasmine.createSpyObj<typeof fs>('fsSpy', [
            'readFileSync', 'writeFileSync'
        ]);

        templateSpy = jasmine.createSpyObj<Template>('templateSpy', [
            'templatify'
        ]);

        compile = new Compile(fsSpy, templateSpy);
    });

    it('delegates to fs to read the contents of a single file', () => {
        compile.compile('file.html');

        var options = { encoding: 'utf8' };

        expect(fsSpy.readFileSync).toHaveBeenCalledWith('file.html', options);
    });

    it('delegates to Template to generate the template file', () => {
        setSpy(fsSpy.readFileSync).toReturn('<div>stuff</div>');

        compile.compile('file.html');

        expect(templateSpy.templatify).toHaveBeenCalledWith('<div>stuff</div>');
    });

    it('delegates to fs to write the generated template to file', () => {
        setSpy(templateSpy.templatify).toReturn('compiled template');

        compile.compile('file.html');

        expect(fsSpy.writeFileSync).toHaveBeenCalledWith('file.html.ts', 'compiled template');
    });

});