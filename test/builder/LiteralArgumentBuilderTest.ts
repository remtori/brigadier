import { assert, expect } from 'chai'
import Command from "../../src/lib/Command"
import LiteralArgumentBuilder from "../../src/lib/builder/LiteralArgumentBuilder"
import { argument } from "../../src/lib/builder/RequiredArgumentBuilder"
import { Type } from "../../src/lib/arguments/ArgumentType"

const { integer } = Type;

describe('LiteralArgumentBuilderTest', () => {

	let builder: LiteralArgumentBuilder<Object>;
	const command: Command<Object> = () => 0;

	beforeEach(() => {
		builder = new LiteralArgumentBuilder("foo");
	})

	it('testBuild', () => {		
        const node = builder.build();
        assert.equal(node.getLiteral(), "foo");
    })

    it('testBuildWithExecutor', () => {		
        const node = builder.executes(command).build();

        assert.equal(node.getLiteral(), "foo");
        assert.equal(node.getCommand(), command);
    })

    it('testBuildWithChildren', () => {		
        builder.then(argument("bar", integer()));
        builder.then(argument("baz", integer()));
        const node = builder.build();

        assert.equal(node.getChildrenCount(), 2);
    })
})