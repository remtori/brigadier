const { argument, literal, CommandDispatcher, StringReader } = require('../dist')

class BlockPosArgument {
	parse(reader) {
		readexr
	}
	listSuggestions(context, builder) {

	}
	getExamples() {
		return [
			"1 0 1"
		]
	}
}

const dispatcher = new CommandDispatcher();

dispatcher.register(
	literal("fill").then(
		argument("pos", )
	)
)