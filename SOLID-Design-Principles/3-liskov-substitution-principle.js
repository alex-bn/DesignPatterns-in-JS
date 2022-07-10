// if you have some method or some function which takes some base type, it should also equally be able to take a derived type

// // Example:

// class Rectangle {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   get area() {
//     return this.width * this.height;
//   }

//   toString() {
//     return `${this.width}x${this.height}`;
//   }
// }

// // somewhere down the line you introduce a new concept called the square

// class Square extends Rectangle {
//   constructor(size) {
//     super(size, size);
//   }
// }

// let rc = new Rectangle(2, 3);
// console.log(rc.toString());

// // if you don't enforce the rule of width = height, then you can do something like this:
// let sq = new Square(5);
// console.log(sq.toString());
// sq.width = 10;
// console.log(sq.toString());

// how to fix this ? one really dangerous way of fixing this problem would be to rewrite both Rectangle and Square to use getters and setters instead of ordinary fields:

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }

  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width}x${this._height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._height = value;
  }

  set height(value) {
    this._width = this._height = value;
  }
}

// // this might solve the issue above
// let rc = new Rectangle(2, 3);
// console.log(rc.toString());

// let sq = new Square(5);
// console.log(sq.toString());
// sq.width = 10;
// console.log(sq.toString());

// you can have functions which work with the base class but which fail completely when used with a derived class
// because it can take a rectangle it can equally take a square
let useIt = function (rc) {
  let width = rc._width;
  rc.height = 10;
  console.log(`Expected area of ${10 * width}, ` + `got ${rc.area}`);
};

let rc = new Rectangle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);
