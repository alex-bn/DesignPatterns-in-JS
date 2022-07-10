// enumerations
let Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue',
});

let Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

//
class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// open for extension, closed for modification
// modification = I'm modifying a class that might have already been tested, might have already been deployed somewhere(production) and I'm making changes to it
// modification is not as good as extension = typically means inheritance, a class inherits from another class
class ProductFilter {
  filterByColor(products, color) {
    return products.filter(p => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter(p => (p.size = size));
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter(p => p.size === size && p.color === color);
  }

  // if we keep adding methods
  // state space explosion
  // 3 criteria = 7 methods
}

// specification
// this way every single filter is untied from another
// if you need a new specification you don;t modify an existing class
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

// combinator = a specification that combines any number of specification
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green))
  console.log(` * ${p.name} is green`);

// better method
class BetterFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();

console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`large and green products:`);
let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);

for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is both large and green`);
}
