# Node-Brigadier
___
This is a nodejs version of Mojang's Brigadier library.
>Brigadier is a command parser & dispatcher, designed and developed for Minecraft: Java Edition and now freely available for use elsewhere under the MIT license.
# Installation
___
```
npm install node-brigadier --save
```
# Usage
___
## Dispatch a command
```javascript
const { CommandDispatcher, literal, argument, string, Suggestions } = require("node-brigadier")

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

// Console
// BlockPos { x: 3, y: 4, z: 5 }
// BlockPos { x: 10, y: 11, z: 12 }
// air
```