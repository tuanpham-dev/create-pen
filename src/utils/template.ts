import * as ejs from 'ejs'

export interface TemplateData {
	projectName: string,
	html: string,
	css: string,
	js: string,
	indentStyle: string,
	indentSize: string,
	preprocessors: string[]
}

export function render(content: string, data: TemplateData) {
	return ejs.render(content, data, {delimiter: '@'})
}
