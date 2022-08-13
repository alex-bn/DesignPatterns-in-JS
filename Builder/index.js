// Builder // When construction gets a little bit too complicated
// When piecewise object construction is complicated, provide an API for doing it succinctly

// 3.1 -> A more structured approach to outputting html:
class Tag {
  static get indentSize() {
    return 2;
  }

  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent) {
    let html = [];
    let i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    for (let child of this.children) html.push(child.toStringImpl(indent + 1));

    html.push(`${i}</${this.name}>\n`);
    return html.join();
  }

  toString() {
    return this.toStringImpl(0);
  }
}

// 1 -> Constructing a chunk of HTML:
const hello = 'hello';
let html = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
console.log(html.join(''));

// 2 -> Constructing a list of words:
const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');
for (let word of words) html.push(` <li>${word}</li>\n`);
html.push('</ul>\n');
console.log(html.join(''));
