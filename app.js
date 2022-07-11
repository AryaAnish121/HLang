const fs = require('fs');

const path = process.argv[2];

if (!path) {
  console.log('> ERROR! The file path is not provided');
} else if (!fs.existsSync(path)) {
  console.log('> ERROR! Invalid file path: ' + path);
} else {
  let code = fs.readFileSync(path, 'utf-8');
  const codeCheck = code;
  const dir = fs.readdirSync(__dirname + '/translation');
  const okWords = ['ANOTHER CMD', '+', '-', '/', '*', ';'];

  dir.forEach((file) => {
    const codeConetent = fs.readFileSync(
      __dirname + `/translation/${file}`,
      'utf-8'
    );
    const letter = file.replace('.lang', '');
    code = code.replaceAll(codeConetent, letter);
    okWords.push(codeConetent);
  });

  const okContent = (str) => {
    okWords.forEach((entry) => (str = str.replaceAll(entry, '')));
    return str.trim();
  };

  const extraThings = okContent(codeCheck);

  if (extraThings !== '') {
    console.log(
      '> ERROR! The file contains some extra characters: ' + extraThings
    );
  } else {
    const parts = code.split('ANOTHER CMD');

    parts.forEach((part) => {
      let snippet = part
        .trim()
        .replaceAll(/ /g, '')
        .replaceAll('\n', '')
        .replaceAll('\r', '')
        .replaceAll(';', ' ');

      if (snippet.startsWith('print')) {
        const message = snippet.replace('print', '').trim();
        console.log(message);
      } else if (!isNaN(eval(snippet))) {
        console.log(eval(snippet));
      } else {
        console.log('> Invalid snippet: ' + snippet);
      }
    });
  }
}
