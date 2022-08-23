(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{"./node_modules/refractor/lang/markdown.js":function(module,exports,__webpack_require__){"use strict";function markdown(Prism){!function(Prism){var inner=/(?:\\.|[^\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))/.source;function createInline(pattern,starAlternative){return pattern=pattern.replace(/<inner>/g,inner),starAlternative&&(pattern=pattern+"|"+pattern.replace(/_/g,"\\*")),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+pattern+")")}var tableCell=/(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,tableRow=/\|?__(?:\|__)+\|?(?:(?:\r?\n|\r)|$)/.source.replace(/__/g,tableCell),tableLine=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\r?\n|\r)/.source;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+tableRow+tableLine+"(?:"+tableRow+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+tableRow+tableLine+")(?:"+tableRow+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(tableCell),inside:Prism.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+tableRow+")"+tableLine+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+tableRow+"$"),inside:{"table-header":{pattern:RegExp(tableCell),alias:"important",inside:Prism.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,lookbehind:!0,alias:"keyword"},{pattern:/``.+?``|`[^`\r\n]+`/,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:createInline(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:createInline(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:createInline(/(~~?)(?:(?!~)<inner>)+?\2/.source,!1),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},url:{pattern:createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source,!1),lookbehind:!0,greedy:!0,inside:{variable:{pattern:/(\[)[^\]]+(?=\]$)/,lookbehind:!0},content:{pattern:/(^!?\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),["url","bold","italic","strike"].forEach((function(token){["url","bold","italic","strike"].forEach((function(inside){token!==inside&&(Prism.languages.markdown[token].inside.content.inside[inside]=Prism.languages.markdown[inside])}))})),Prism.hooks.add("after-tokenize",(function(env){"markdown"!==env.language&&"md"!==env.language||function walkTokens(tokens){if(tokens&&"string"!=typeof tokens)for(var i=0,l=tokens.length;i<l;i++){var token=tokens[i];if("code"===token.type){var codeLang=token.content[1],codeBlock=token.content[3];if(codeLang&&codeBlock&&"code-language"===codeLang.type&&"code-block"===codeBlock.type&&"string"==typeof codeLang.content){var alias="language-"+codeLang.content.trim().split(/\s+/)[0].toLowerCase();codeBlock.alias?"string"==typeof codeBlock.alias?codeBlock.alias=[codeBlock.alias,alias]:codeBlock.alias.push(alias):codeBlock.alias=[alias]}}else walkTokens(token.content)}}(env.tokens)})),Prism.hooks.add("wrap",(function(env){if("code-block"===env.type){for(var codeLang="",i=0,l=env.classes.length;i<l;i++){var cls=env.classes[i],match=/language-(.+)/.exec(cls);if(match){codeLang=match[1];break}}var grammar=Prism.languages[codeLang];if(grammar){var code=env.content.value.replace(/&lt;/g,"<").replace(/&amp;/g,"&");env.content=Prism.highlight(code,grammar,codeLang)}else if(codeLang&&"none"!==codeLang&&Prism.plugins.autoloader){var id="md-"+(new Date).valueOf()+"-"+Math.floor(1e16*Math.random());env.attributes.id=id,Prism.plugins.autoloader.loadLanguages(codeLang,(function(){var ele=document.getElementById(id);ele&&(ele.innerHTML=Prism.highlight(ele.textContent,Prism.languages[codeLang],codeLang))}))}}})),Prism.languages.md=Prism.languages.markdown}(Prism)}module.exports=markdown,markdown.displayName="markdown",markdown.aliases=["md"]}}]);