# html-excerpt-extractor

[![npm](https://img.shields.io/npm/v/html-excerpt-extractor)](https://www.npmjs.com/package/html-excerpt-extractor) [![build status](https://img.shields.io/github/actions/workflow/status/gravima/html-excerpt-extractor/main.yml?branch=main)](https://github.com/gravima/html-excerpt-extractor/actions)

`html-excerpt-extractor` is a handy npm package that allows for extracting excerpts from HTML content. This tool can be very useful for generating content previews or search result snippets where only a portion of the HTML content is displayed.

Based on the excellent package [html-parser.ts](https://www.npmjs.com/package/html-parser.ts), this package extracts text content from HTML and trims it to a specified length. The package also provides options for customizing the excerpt length.

## Installation

Install the package using your favorite package manager:

```bash
npm install html-excerpt-extractor
# or
pnpm add html-excerpt-extractor
# or
yarn add html-excerpt-extractor
```

## Usage

After installation, you can import and use the module in your JavaScript or TypeScript project:

```javascript
const { extractExcerpt } = require("html-excerpt-extractor");

const htmlContent = "<div>Some <strong>important</strong> content</div>";
const excerpt = extractExcerpt(htmlContent, { length: 100 });

console.log(excerpt); // Outputs: "Some important content"
```

## Development and Contributing

Interested in contributing to the development of this project? Great! You can clone the repository and install dependencies using pnpm:

```bash
git clone https://github.com/gravima/html-excerpt-extractor.git
cd html-excerpt-extractor
pnpm install
```

Feel free to report issues or submit pull requests if you have suggestions for improvements or have found bugs.

## License

This project is released under the MIT License. Details can be found in the [LICENSE](LICENSE) file.
