# `file2datauri`

Converts files and stdin into data URI scheme strings.

## Examples

Convert this red dot ![Red Dot](https://upload.wikimedia.org/wikipedia/commons/3/31/Red-dot-5px.png) from the 
[data URI scheme Wikipedia page](https://en.wikipedia.org/wiki/Data_URI_scheme) into a data URI string:  

```bash
curl -s 'https://upload.wikimedia.org/wikipedia/commons/3/31/Red-dot-5px.png' \
  | file2datauri  

data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
```

Read a .jpeg file, convert it to a data URI, and write the text to an output file: 

```bash
file2datauri < someimage.jpg > output.txt
```

## Install

Install `file2datauri` with `npm`: 

```bash
npm install -g file2datauri
```

## Input and Output

By default, `file2datauri` takes input from stdin and outputs to stdout.

You can use stdin redirect to read from a file: 

```bash
file2datauri < icon.png
```

Alternatively, you can use the `-f` flag to specify a filename. 

You can use stdout redirect to write the output to a file: 

```bash
curl example.com/image.png | file2datauri > image.png
```

## Flags

### `-m` Override the mime type

`file2datauri` attempts to resolve the mime type from the contents of the input. 
If you instead want to override the mime type, you can use the `-m` flag along with your mime type. 

```
file2datauri -m 'text/markdown' < input.md

data:text/markdown;base64,IyBIZWxsbywgd29ybGQh
```

### `-f` Specify an input file

If you don't want to use stdin, you can specify a file using `-f`. 

```bash
file2datauri -m 'text/plain' -f secret.txt

data:text/plain;base64,QmUgc3VyZSB0byBkcmluayB5b3VyIE92YWx0aW5l
```
