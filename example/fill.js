const { CommandDispatcher, literal, argument, string, Suggestions } = require("../dist")

class BlockPos {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x; this.y = y; this.z = z;
	}
	parse(reader) {
		this.x = reader.readInt();
		reader.skip();
		this.y = reader.readInt();
		reader.skip();
		this.z = reader.readInt();
		return this;
	}
	listSuggestions(context, builder) {
		return Suggestions.empty();
	}
	getExamples() {
		return [
			"1 2 3"
		]
	}
}

const dispatcher = new CommandDispatcher();

dispatcher.register(
	literal("fill").then(
		argument("pos1", new BlockPos()).then(
			argument("pos2", new BlockPos()).then(
				argument("block", string()).executes(context => {
					console.log(context.getArgument("pos1", BlockPos))
					console.log(context.getArgument("pos2", BlockPos))
					console.log(context.getArgument("block", /*String*/ 3))
					return 0;
				})
			)
		)
	)
)

const parsedCommand = dispatcher.parse("fill 3 4 5 10 11 12 air", {})
try {
	dispatcher.execute(parsedCommand);
} catch (ex) {
	console.error(ex.getMessage());
}