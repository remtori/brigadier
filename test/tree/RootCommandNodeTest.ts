import { assert, expect } from "chai"
import { mock, instance } from "ts-mockito"
import RootCommandNode from "../../src/lib/tree/RootCommandNode"
import CommandContext from "../../src/lib/context/CommandContext"
import StringReader from "../../src/lib/StringReader"
import CommandContextBuilder from "../../src/lib/context/CommandContextBuilder"
import SuggestionsBuilder from "../../src/lib/suggestion/SuggestionsBuilder"
import { literal } from "../../src/lib/builder/LiteralArgumentBuilder"
import CommandDispatcher from "../../src/lib/CommandDispatcher"


describe('RootCommandNodeTest', () => {
	let node: RootCommandNode<Object>;

	beforeEach(() => {
		node = new RootCommandNode();
	})

	it('testParse', () => {		
        const reader = new StringReader("hello world");
        node.parse(reader, new CommandContextBuilder(new CommandDispatcher(), new Object(), new RootCommandNode(), 0));
        assert.equal(reader.getCursor(), 0);
    })

	it('testAddChildNoRoot', () => {
		try {
            node.addChild(new RootCommandNode()); 
            assert.fail();
		} catch (ex) {
			expect(ex instanceof Error).to.equal(true)
		}
    })

    it('testUsage', () => {				
        assert.equal(node.getUsageText(), "");
    })

    it('testSuggestions', async () => {		
        const context = instance(mock(CommandContext));
        const result = await node.listSuggestions(context, new SuggestionsBuilder("", 0));
        assert.equal(result.isEmpty(), true);
    })

	it('testCreateBuilder', () => {				
		try {
			node.createBuilder();
		} catch (ex) {
			expect(ex instanceof Error).to.equal(true)
		}
    })

    it('testEquals', () => {		
	
		assert.equal(new RootCommandNode().equals(new RootCommandNode()), true)
	
		const temp1 = new RootCommandNode<Object>();
		temp1.addChild(literal("foo").build())
		const temp2 = new RootCommandNode<Object>()
		temp2.addChild(literal("foo").build())

		assert.equal(temp1.equals(temp2), true)	
    })
})