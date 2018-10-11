import { assert, expect } from "chai"
import { mock, instance } from "ts-mockito"
import CommandNode from "../../src/lib/tree/CommandNode"
import ArgumentBuilder from "../../src/lib/builder/ArgumentBuilder";
import { argument } from "../../src/lib/builder/RequiredArgumentBuilder"
import { literal } from "../../src/lib/builder/LiteralArgumentBuilder"
import { DefaultType } from "../../src/lib/arguments/ArgumentType"

const { integer } = DefaultType;

class TestableArgumentBuilder<S> extends ArgumentBuilder<S, TestableArgumentBuilder<S>> {
	public getThis(): TestableArgumentBuilder<S> {
		return this;
	}
	public build(): CommandNode<S> {
		return null;
	}
}

describe('ArgumentBuilderTest', () => {
	let builder: TestableArgumentBuilder<Object>;

	beforeEach(() => {
		builder = new TestableArgumentBuilder();
	})

	it('testArguments', () => {		
        const arg = argument("bar", integer());

        builder.then(arg);

        assert.equal([...builder.getArguments()].length, 1);
        expect(builder.getArguments().next().value.equals(arg.build())).to.equal(true);
    })

    it('testRedirect', () => {		
        const target = instance(mock(CommandNode));
        builder.redirect(target);
        assert.deepEqual(builder.getRedirect(), target);
    })

	it('testRedirect_withChild', () => {		
		try {
			const target = instance(mock(CommandNode));
			builder.then(literal("foo"));
			builder.redirect(target);
			assert.fail();
		} catch (ignore) {			
		}
    })

	it('testThen_withRedirect', () => {		
		try {
			const target = instance(mock(CommandNode));
			builder.redirect(target);
			builder.then(literal("foo"));
			assert.fail();
		} catch (ignore) {			
		}
    })
})