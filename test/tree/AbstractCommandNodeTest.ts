import { assert, expect } from "chai"
import { mock, instance } from "ts-mockito"
import Command from "../../src/lib/Command"
import CommandNode from "../../src/lib/tree/CommandNode"
import RootCommandNode from "../../src/lib/tree/RootCommandNode"
import { literal } from "../../src/lib/builder/LiteralArgumentBuilder"

describe('AbstractCommandNodeTest', () => {
	const command: Command<Object> = () => 0;

	function getCommandNode(): CommandNode<Object> {
		return new RootCommandNode();
	}

	it('testAddChild', () => {
		const node = getCommandNode();

		node.addChild(literal("child1").build());
        node.addChild(literal("child2").build());
		node.addChild(literal("child1").build());
		
		assert.equal(node.getChildrenCount(), 2);
	})

	it('testAddChildMergesGrandchildren', () => {
		const node = getCommandNode();

		node.addChild(literal("child").then(
            literal("grandchild1")
        ).build());

        node.addChild(literal("child").then(
            literal("grandchild2")
		).build());
		
		assert.equal(node.getChildrenCount(), 1);
		assert.equal(node.getChildren().next().value.getChildrenCount(), 2);
	})

	it('testAddChildPreservesCommand', () => {
		const node = getCommandNode();

		node.addChild(literal("child").executes(command).build());
		node.addChild(literal("child").build());
		
		expect(node.getChildren().next().value.getCommand()).to.deep.equal(command);
	})

	it('testAddChildOverwritesCommand', () => {
		const node = getCommandNode();

		node.addChild(literal("child").build());
		node.addChild(literal("child").executes(command).build());		
		
		expect(node.getChildren().next().value.getCommand()).to.deep.equal(command);
	})
})