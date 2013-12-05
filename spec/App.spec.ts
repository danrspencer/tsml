import jts = require('jts'); var spyOf = jts.spyOf, setSpy = jts.setSpy;

import fs = require('fs');

import App = require('../source/App');
import Compile = require('../source/Compile');

describe('App', () => {

    var compileSpy: Compile;
    var fsSpy: typeof fs;

    var app: App;

    beforeEach(() => {
        compileSpy = jasmine.createSpyObj<Compile>('compileSpy', [
            'compile'
        ]);

        fsSpy = jasmine.createSpyObj<typeof fs>('fsSpy', [
            'statSync', 'readdirSync'
        ]);
        setSpy(fsSpy.statSync).toCallFake((path) => {
            return {
                isFile: () => {
                    return path !== 'folder'
                }
            }
        });
        setSpy(fsSpy.readdirSync).toReturn([]);

        app = new App(fsSpy, compileSpy);
    });

    it('delegates to Compile for each given file path', () => {
        app.run(['test.html', 'test2.html']);

        expect(compileSpy.compile).toHaveBeenCalledWith('test.html');
        expect(compileSpy.compile).toHaveBeenCalledWith('test2.html');
    });

    it('delegates to fs to check if each path is a file or folder', () => {
        app.run(['test.html', 'test2.html', 'folder']);

        expect(fsSpy.statSync).toHaveBeenCalledWith('test.html');
        expect(fsSpy.statSync).toHaveBeenCalledWith('test2.html');
        expect(fsSpy.statSync).toHaveBeenCalledWith('folder');
    });

    it('does not call compile for folders', () => {
        app.run(['test.html', 'test2.html', 'folder']);

        expect(spyOf(compileSpy.compile).callCount).toEqual(2);
    });

    it('delegates to fs to get the contents of a folder path', () => {
        app.run(['folder']);

        expect(fsSpy.readdirSync).toHaveBeenCalledWith('folder');
    });

    it('compiles .html files within a folder', () => {
        setSpy(fsSpy.readdirSync).toReturn(['file.html', 'file2.html']);

        app.run(['folder']);

        expect(compileSpy.compile).toHaveBeenCalledWith('folder/file.html');
        expect(compileSpy.compile).toHaveBeenCalledWith('folder/file2.html');
    });

});