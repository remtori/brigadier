import { assert } from 'chai'
import { mock, instance } from 'ts-mockito'
import testEquality from "../utils/testEquality"
import CommandContextBuilder from '../../src/lib/context/CommandContextBuilder'
import CommandDispatcher from '../../src/lib/CommandDispatcher';
import RootCommandNode from '../../src/lib/tree/RootCommandNode';
import Primitive from '../../src/lib/Primitive';
import ParsedArgument from '../../src/lib/context/ParsedArgument';
import CommandNode from '../../src/lib/tree/CommandNode';
import StringRange from '../../src/lib/context/StringRange';

describe('CommandContextTest', () => {
	let builder: CommandContextBuilder<Object>;
	const source = {};
	const rootNode = new RootCommandNode();
	const dispatcher = new CommandDispatcher<Object>(rootNode);

	beforeEach(() => {
		builder = new CommandContextBuilder(dispatcher, source, rootNode, 0);
	})	

	it('testGetArgument_nonexistent', done => {
		try {
			builder.build("").getArgument("foo", 10);			
		} catch (ex) {
			done();
			return;
		}

		assert.fail();
    })

    it('testGetArgument_noConverter', done => {		
		try {
			const context = builder.withArgument("foo", new ParsedArgument(0, 1, Object.create(null))).build("123");
			context.getArgument("foo", Primitive.String);			
		} catch (ex) {
			done();
			return;
		}

		assert.fail();
    })

    it('testGetArgument', () => {		
        const context = builder.withArgument("foo", new ParsedArgument(0, 1, 123)).build("123");
        assert.equal(context.getArgument("foo", Primitive.Int), 123);
    })

    it('testSource', () => {		
        assert.deepEqual(builder.build("").getSource(), source);
    })

    it('testRootNode', () => {		
        assert.deepEqual(builder.build("").getRootNode(), rootNode);
    })

    it('testEquals', () => {		
        const otherSource = new Object();
        const command = () => 1;
		const otherCommand = () => 2;
		
		const mockedCommandNode = mock(CommandNode)
        const rootNode = new RootCommandNode()
        const otherRootNode = new RootCommandNode()
        const node: CommandNode<Object> = instance(mockedCommandNode)
        const otherNode: CommandNode<Object> = instance(mockedCommandNode)
        
		testEquality(new CommandContextBuilder(dispatcher, source, rootNode, 0).build(""), new CommandContextBuilder(dispatcher, source, rootNode, 0).build(""))
		testEquality(new CommandContextBuilder(dispatcher, source, otherRootNode, 0).build(""), new CommandContextBuilder(dispatcher, source, otherRootNode, 0).build(""))
		testEquality(new CommandContextBuilder(dispatcher, otherSource, rootNode, 0).build(""), new CommandContextBuilder(dispatcher, otherSource, rootNode, 0).build(""))
		testEquality(new CommandContextBuilder(dispatcher, source, rootNode, 0).withCommand(command).build(""), new CommandContextBuilder(dispatcher, source, rootNode, 0).withCommand(command).build(""))
		testEquality(new CommandContextBuilder(dispatcher, source, rootNode, 0).withCommand(otherCommand).build(""), new CommandContextBuilder(dispatcher, source, rootNode, 0).withCommand(otherCommand).build(""))
		testEquality(new CommandContextBuilder(dispatcher, source, rootNode, 0).withArgument("foo", new ParsedArgument(0, 1, 123)).build("123"), new CommandContextBuilder(dispatcher, source, rootNode, 0).withArgument("foo", new ParsedArgument(0, 1, 123)).build("123"))
		testEquality(new CommandContextBuilder(dispatcher, source, rootNode, 0).withNode(node, StringRange.between(0, 3)).withNode(otherNode, StringRange.between(4, 6)).build("123 456"), new CommandContextBuilder(dispatcher, source, rootNode, 0).withNode(node, StringRange.between(0, 3)).withNode(otherNode, StringRange.between(4, 6)).build("123 456"))
		testEquality(new CommandContextBuilder(dispatcher, source, rootNode, 0).withNode(otherNode, StringRange.between(0, 3)).withNode(node, StringRange.between(4, 6)).build("123 456"), new CommandContextBuilder(dispatcher, source, rootNode, 0).withNode(otherNode, StringRange.between(0, 3)).withNode(node, StringRange.between(4, 6)).build("123 456"))        
    })
})