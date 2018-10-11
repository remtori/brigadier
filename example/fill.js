const { argument, literal, CommandDispatcher, StringReader } = require('../dist')

class BlockPosArgument {
	parse(reader) {

	}
	listSuggestions(context, builder) {

	}
	getExamples() {
		
	}
}

const dispatcher = new CommandDispatcher();

dispatcher.register(
	literal("fill").then(
		argument("pos", )
	)
)