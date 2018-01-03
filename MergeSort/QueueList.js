"use strict";

const Nodes = require("../Misc/LinkedNodes.js");
const privateMap = new WeakMap();

class QueueList {
    constructor(firstElement) {
        let values = {
            firstNode : null,
            lastNode : null
        }

        if(firstElement != null) {
            values.firstNode = new Nodes(firstElement);
            values.lastNode = values.firstNode;
        }

        privateMap.set(this, values);

    }
    append(newElement) {
        if(newElement == null)
            return ;
        
        let object = privateMap.get(this);

        if(object.firstNode == null) {
            //This is the first element in queue
            object.firstNode = new Nodes(newElement);;
            object.lastNode = object.firstNode;
        }
        else {
            //Creating new node
            const newNode = new Nodes(newElement);
            //Set the new node as next for the current last node
            object.lastNode.setNextNode(newNode);
            //Set the current last node as the previous for the new node
            newNode.setPrevNode(object.lastNode);
            //Set the new node as the last node
            object.lastNode = newNode;
        }

    }

    unshift() {

        const object = privateMap.get(this);
        const firstNode = object.firstNode;
        const nodeValue = firstNode.getValue();
        const nextNode =  firstNode.getNextNode();

        //If there are no first element
        if(firstNode == null)
            return null;

        //If there is only one element in the list
        if(firstNode == object.lastNode)
        {
            delete object.lastNode;
            
        }
        //If there are more than one element
        delete object.firstNode;
        object.firstNode = nextNode;

        return nodeValue;
    }

}

//Test
//Boundary condition: when there is only one element in the list
let ql = new QueueList();
ql.append(32);

console.assert(ql.unshift() == 32, "First element not found");

ql.append(64);

module.exports = QueueList;