# Change log
___
## 0.0.3
- Add support for Typescript
- Add CHANGELOG file
## 0.0.4
- Update README
- Clearer d.ts
- Add an example folder
## 0.0.5
- Update index.d.ts to clear some typescript error
- Remove unnecessary d.ts
## 0.0.6
- Update d.ts
- Change Set to Array (IterableIterator -> Iterable)
## 0.0.7
- Fix Exception classes required 0 argument in constructor
## 0.0.8
- Export a default dispatcher `dispatcher = new CommandDispatcher()`
## 0.0.9
- Remove `Dynamic2CommandExceptionType`
- Make `DynamicCommandExceptionType` recieve any argument
- Clearer declaration (d.ts)
## 0.0.10
- Add constructor to `StringReader` in d.ts (Opps~)
- Change `CommandSyntaxException` to more suitable for Javascript
- Make `listSuggestions()` and `getExamples()` in `interface ArgumentType` optional
## 0.0.11
- Replace `enum Primitive` with default JS Function `Number() String() Boolean()`
- StringReader now allow scientific notation of numbers ex: `12e-3`