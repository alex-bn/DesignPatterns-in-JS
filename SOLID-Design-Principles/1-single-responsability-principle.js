const fs = require('fs');

// a class should have a single primary responsibility

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  // // you might be tempted to add a second responsibility to the Journal class related to persistence operations
  // save(filename) {
  //   fs.writeFileSync(filename, this.toString());
  // }
  // load(filename) {
  //   //
  // }
  // loadFromUrl(url) {
  //   //
  // }
}

Journal.count = 0;

// separation of concerns
// persistence operations separated class
class PersistenceManager {
  preprocess(journal) {
    //
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

// it is better to group functionality by class

let j = new Journal();
j.addEntry('I ate a bug');
j.addEntry('I did 10 push-ups');

console.log(j.toString());

let p = new PersistenceManager();
let filename = './journal.txt';
p.saveToFile(j, filename);
