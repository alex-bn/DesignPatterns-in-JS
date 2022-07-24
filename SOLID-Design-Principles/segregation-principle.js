// javascript doesn't really have interfaces
// let's imagine that you do decide to somehow formalize the interaction with a particular system

// Note on override: an override is a concept that comes from object-oriented programming where inheritance is used to extend class methods
class A {
  // parent method
  print() {
    console.log('class A');
  }
}

class B extends A {
  // override method()
  print() {
    console.log('class B');
  }
  parentPrint() {
    super.print();
  }
}

const b = new B();
b.print();
b.parentPrint();

// However, modern practice is to favor composition over object-oriented inheritance:
// use composition with dependency injection, to create loosely coupled dependencies which are more suitable for unit testing
const parseFloatOverride = function (number) {
  return number.parseFloat();
};

// back to segregation exercise:

// given a Document class such as:
class Document {}

// you have clients that want to implement different devices such as printers, scanners and so on
// now, you will want to create a class which behaves like an interface definition:

class Machine {
  constructor() {
    if (this.constructor.name === 'Machine')
      throw new Error('Machine is abstract!'); // you make sure that this class cannot be constructed
  }
  // whoever wants to make a machine should be overriding the below methods
  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    // super.print(doc);
    // or give them meaningful content
  }
  fax(doc) {
    // super.fax(doc);
    // or give them meaningful content
  }
  scan(doc) {
    // super.scan(doc);
    // or give them meaningful content
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented`;
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // ok - because an old fashioned printer can print
  }
  fax(doc) {
    // doesn't know how to fac docs
    // do nothing
  }
  scan(doc) {
    // doesn't know how to scan docs
    // doing nothing brakes the principle of least surprise
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
} // unfortunately this is still not a very user friendly approach

// INTERFACE SEGREGATION PRINCIPLE approach:
// you have to segregate interface into different parts so that people don;t implement more than what they need

class Printer {
  constructor() {
    if (this.constructor.name === 'Printer') {
      throw new Error('Printer is abstract!');
    }
  }
  print() {}
}

class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner') {
      throw new Error('Scanner is abstract!');
    }
  }
  scan() {}
}

// this only works for single inheritance

const printer = new OldFashionedPrinter();
printer.scan();
