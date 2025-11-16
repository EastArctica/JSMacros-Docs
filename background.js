// Note: `int` and `float` are two distinct things. A floating point number CANNOT be passed to a method requesting an int.

const clazz = 'Client';

function processType(type) {
    if (type.toLowerCase() == 'string') return 'string';
    return type.replaceAll('\n', '');
}

const methods = [...document.querySelectorAll('.method')].map(elem => {
    const methodTitle = elem.querySelector('.methodTitle').innerText;
    const returnType = elem.querySelector('.methodReturn .type').innerText;
    
    return `### ${clazz}${methodTitle.split('(')[0]}
\`\`\`js
${clazz}${methodTitle};
\`\`\`

**Params**
${methodTitle.endsWith('()') ? '* `(none)`' : ((table) => {
    const rows = [...table.querySelectorAll('tbody > tr')];
    return rows.map((row, i) => `${i + 1}. \`${row.children[0].innerText}: ${processType(row.children[1].innerText)}\`: TODO(Describe param)`);
})(elem.querySelector('.paramTable')).join('\n')}

**Returns**
* \`${returnType}\`${returnType === 'void' ? '' : `: ${elem.querySelector('.methodReturn .methodReturnDesc')?.innerText || 'TODO(Describe return value)'}`}`;
}).join('\n\n');

const mdFile = `# ${clazz}
## Methods

${methods}`

console.log(mdFile);
copy(mdFile);