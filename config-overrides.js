const sassExport = require('sass-export');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');


// loads a *.scss file, parses its variables and spits out an object
function getTheme() {
  var themepath = './src/theme/1-settings/'
  let theme = sassExport.exporter({ inputFiles: [`${themepath}_typography.scss`, `${themepath}_colors.scss`, `${themepath}_layout.scss` ] })

  return theme.getStructured().variables.reduce((obj, v) => {
    return { ...obj, [v.name.replace('$', '')]: v.compiledValue }
  }, {})
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: getTheme()
  }),
);
