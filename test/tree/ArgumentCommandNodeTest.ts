import { assert } from "chai"
import testEquality from "../utils/testEquality"
import { DefaultType } from "../../src/lib/arguments/ArgumentType"
import Command from "../../src/lib/Command"
import CommandNode from "../../src/lib/tree/CommandNode"
import RootCommandNode from "../../src/lib/tree/RootCommandNode"
import CommandDispatcher from "../../src/lib/CommandDispatcher"
import ArgumentCommandNode from "../../src/lib/tree/ArgumentCommandNode"
import CommandContextBuilder from "../../src/lib/context/CommandContextBuilder"
import RequiredArgumentBuilder, { argument } from "../../src/lib/builder/RequiredArgumentBuilder"
import SuggestionsBuilder from "../../src/lib/suggestion/SuggestionsBuilder"
import StringReader from "../../src/lib/StringReader"

const { integer	} = DefaultType;

describe('ArgumentCommandNodeTest', () => {
	const command: Command<Object> = () => 0;
	let contextBuilder: CommandContextBuilder<Object>;
	let node: ArgumentCommandNode<Object, number>;

	function getCommandNode(): CommandNode<Object> {
		return node;
	}

	beforeEach(() => {
		node = argument("foo", integer()).build();
        contextBuilder = new CommandContextBuilder(new CommandDispatcher(), new Object(), new RootCommandNode(), 0);
	})

	it('testParse', () => {		
        const reader = new StringReader("123 456");
        node.parse(reader, contextBuilder);

        assert.equal(contextBuilder.getArguments().has("foo"), true);
        assert.equal(contextBuilder.getArguments().get("foo").getResult(), 123);
    })

    it('testUsage', () => {		
        assert.equal(node.getUsageText(), "<foo>");
    })

    it('testSuggestions', async () => {		
        const result = await node.listSuggestions(contextBuilder.build(""), new SuggestionsBuilder("", 0));
        assert.equal(result.isEmpty(), true);
    })

    it('testEquals', () => {		
		testEquality(
			argument("foo", integer()).build(),
			argument("foo", integer()).build()
		)
		testEquality(
			argument("foo", integer()).executes(command).build(),
			argument("foo", integer()).executes(command).build()
		)
		testEquality(
			argument("bar", integer(-100, 100)).build(),
			argument("bar", integer(-100, 100)).build()
		)
		testEquality(
			argument("foo", integer(-100, 100)).build(),
			argument("foo", integer(-100, 100)).build()
		)
		testEquality(
			argument("foo", integer()).then(
				argument("bar", integer())
			).build(),
			argument("foo", integer()).then(
				argument("bar", integer())
			).build()
		)
    })

    it('testCreateBuilder', () => {		
        const builder: RequiredArgumentBuilder<Object, number> = node.createBuilder();
        assert.equal(builder.getName(), node.getName());
        assert.deepEqual(builder.getType(), node.getType());
        assert.deepEqual(builder.getRequirement(), node.getRequirement());
        assert.deepEqual(builder.getCommand(), node.getCommand());
    })
})
