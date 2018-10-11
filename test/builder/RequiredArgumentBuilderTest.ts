import { assert, expect } from 'chai'
import { instance, mock } from 'ts-mockito'
import Command from "../../src/lib/Command"
import RequiredArgumentBuilder, { argument } from "../../src/lib/builder/RequiredArgumentBuilder"
import ArgumentType from "../../src/lib/arguments/ArgumentType"
import IntegerArgumentType from "../../src/lib/arguments/IntegerArgumentType"

describe('LiteralArgumentBuilderTest', () => {

	let builder: RequiredArgumentBuilder<Object, number>;
	const type: ArgumentType<number>  = instance(mock(IntegerArgumentType));
	const command: Command<Object> = () => 0;

	beforeEach(() => {
		builder = argument("foo", type);
	})

	it('testBuild', () => {		
        const node = builder.build();

        assert.equal(node.getName(), "foo");
        assert.equal(node.getType(), type);
    })

    it('testBuildWithExecutor', () => {		
        const node = builder.executes(command).build();

        assert.equal(node.getName(), "foo");
        assert.equal(node.getType(), type);
        assert.equal(node.getCommand(), command);
    })

    it('testBuildWithChildren', () => {		
        builder.then(argument("bar", type));
        builder.then(argument("baz", type));
        const node = builder.build();

        assert.equal(node.getChildrenCount(), 2);
    })
})