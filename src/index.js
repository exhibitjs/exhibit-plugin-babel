import { assign, omit } from 'lodash';
import { cache, matcher } from 'exhibit';
import convertSourceMap from 'convert-source-map';
import path from 'path';
// import getShimmedBabel from './getShimmedBabel';

const defaults = {
	match: '**/*.{js,jsx}',
	sourceMaps: true,
};

export default function (_options) {
	const options = assign({}, defaults, _options);

	// ideally user will have set root to the 'src' folder or whatever,
	// but otherwise we need to give it a fake one
	if (!options.root) {
		options.root = (
			process.platform === 'win32'
				? 'X:\\__exhibit-root'
				: '/__exhibit-root'
		);
	} else options.root = path.resolve(options.root);

	// TODO: alias option names (eg sourceMap -> sourceMaps)

	// TODO
	// get a completely new, shimmed babel for this builder to use
	// let _include;
	// const babel = getShimmedBabel(name => _include(name), options.root);
	const babel = require('babel-core');

	// get the options for each compile
	const generalCompileOptions = omit(options, 'match', 'root');

	const match = matcher(options.match);

	return cache((contents, name) => {
		if (!match(name)) return contents;

		const source = contents.toString();

		// _include = include;

		const compileOptions = assign({}, generalCompileOptions, {
			filenameRelative: name,
			sourceRoot: options.root,
			filename: path.resolve(options.root, name),
		});

		let result;
		try {
			result = babel.transform(source, compileOptions);
		} catch (error) {
			throw error;
			// TODO print execerpt
			// todo: remove the "(line:column)" from end of message
			// throw new util.SourceError({
			//   file,
			//   message: error.message,
			//   contents: source,
			//   line: error.loc ? error.loc.line : null,
			//   column: error.loc ? error.loc.column : null,
			// });
		}

		if (options.sourceMaps) {
			delete result.map.sourceRoot;

			const comment = convertSourceMap
				.fromObject(result.map)
				.setProperty('sources', [name])
				.setProperty('sourcesContent', [source])
				.toComment();

			return `${result.code}\n${comment}`;
		}

		return result.code;
	});
}
