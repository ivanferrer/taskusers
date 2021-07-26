const mix = require('laravel-mix');
const del = require('del');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
//command: npm run development
// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css');

mix.react('resources/js/frontend/src/index.js', 'public/js')
.then(() => {
    del('public/index.html');
});
// mix.sass('resources/js/frontend/build/static/css/*.{css,map}', 'public/css');
mix.copyDirectory('resources/js/frontend/build/**!(.html)', 'public');


