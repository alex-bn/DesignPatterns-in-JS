// doesn't have anything directly to do with dependency injection, dependency-injection is somewhat a consequence of this principle
// dependency-inversion principle defines a relation that you should have between low level modules and high level modules

// example:

let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW LEVEL MODULE:
class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === 'RelationshipBrowser') {
      throw new Error('RelationshipBrowser is abstract');
    }
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter(r => r.from.name === name && r.type === Relationship.parent)
      .map(r => r.to);
  }
}

// HIGH-LEVEL MODULE:
class Research {
  // constructor(relationships) {
  //   // find all children of John
  //   let relations = relationships.data; // key-problem: we are using the low-level data storage directly
  //   for (let rel of relations.filter(
  //     r => r.from.name === 'John' && r.type === Relationship.parent
  //   )) {
  //     console.log(`John has a child named ${rel.to.name}`);
  //   }
  // }

  // dependency-inversion principle
  constructor(browser) {
    for (let p of browser.findAllChildrenOf('John')) {
      console.log(`John has a chilled called ${p.name}`);
    }
  }
}

// the dependency-inversion principle states that high level modules(such as Research) should not directly depend on low level modules (such as Relationships), they should instead depend on abstractions

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
