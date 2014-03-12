[![Build Status](https://travis-ci.org/joelgriffith/sickmerge.png?branch=master)](https://travis-ci.org/joelgriffith/sickmerge)

# sickmerge

A command-line git conflict resolution tool. In the browser.

## Getting Started
Install the tool with: `npm install -g sickmerge`

## Usage
```shell
sickmerge [options] <conflicted-file>
```

## How It Works
Sickmerge functions very similarly to a standard Node express application. After passing it your conflicted file, sickmerge will then build a 3-way merge window and start a small web service to deploy to. After you've made your changes (or hitting cancel), sickmerge will persist to contents to the original file and close the program.

You can then go about your normal git workflow and commit the resolved changes.

## Documentation
Sickmerge comes with numerous options and code-highlighting out-of-the-box. You can see the available options by running `sickmerge` without any parameters. Below is more details on what each option does:

- Hostname `-h, --hostname [value]`
Optional. The host that you want to the browser to query for (useful if you're shelled in somewhere else). Defaults to `localhost` since it's likely you'll be using this the machine your coding from.

- Port `-p, --port [number]`
Optional. The port that you wish to deploy the service on. Defaults to 3000.

- Merge `-m, --merge [value]`
Optional. The initial "merged" view strategy that you wish to display in the middle window. Options are 'yours', 'theirs' and 'both'. Defaults to 'yours'.

- Syntax `-s, --syntax [value]`
Optional. The language syntax you wish to use when viewing in the browser. To see a list of available syntaxes, run `sickmerge -o`. Defaults to no syntax highlighting.

- Syntax Options `-o, --syntax-options`
Prints the available language syntaxes for code highlighting when in the browser.

## Examples
- Standard usage
`sickmerge conflict.js`

Loads conflict.js in the current location, and starts up a express app at `http://localhost:3000/` and opens your browser to that address.

- Using the port and hostname options
`sickmerge -p 1337 -h hyrule conflict.js`

Same as above, except this will deploy on port `1337` and open your browser to `http://hyrule:1337`

- Using the syntax highlighting
`sickmerge -s javascript conflict.js`

Opens to `http://localhost:3000` and sets the syntax to JavaScript.

### Thanks
A big thanks to the numerous libraries that this sits on. In no particular order: Node, Express, Commander, EJS, Webpack, Code-Mirror, and Diff-Patch-Match.

### Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Be sure to lint your code and make sure it handles some edge-cases. In the near future, unit tests will be mandatory.

### Release History
v0.0.3 - Unit tests and code cleanup/bugfixes.

v0.0.1 - Initial release

### License
Copyright (c) 2013 jgriffith

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.