
class Template {

    public templatify(input: string): string {
        return 'module file {\n' +
            '    export var html = \'' + input + '\'\n' +
            '}';
    }

}

export = Template;