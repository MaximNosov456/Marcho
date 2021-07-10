const { src, dest, watch, parallel, series } = require("gulp");
let scss = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require('del');
const browserSync = require("browser-sync").create();
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

function browsersync () {
  browserSync.init({
    server: {
        baseDir: "app/"
    }
});
}


function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserslist :['last 10 versions'],grid:true}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(['node_modules/rateyo/src/jquery.rateyo.js',
              'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
              'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
              'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
              'node_modules/slick-carousel/slick/slick.js',
              'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}
function images () {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
    .pipe(dest('dist/images'))
}

function fontsConverter () {
  return src(['app/fonts/*.ttf'])
  .pipe(ttf2woff())
  .pipe(dest('app/fonts/'));
}

function fontsConverter2 () {
  return src(['app/fonts/*.ttf'])
  .pipe(ttf2woff2())
  .pipe(dest('app/fonts/'));
}

function watching() {
   watch(['app/scss/**/*.scss'], styles);
   watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
   watch(['app/*.html']).on('change',browserSync.reload);

}

function build() {
  return src(['app/*.html','app/css/style.min.css', 'app/js/main.min.js'],{base:'app'})
          .pipe(dest('dist'))
}

function cleanDist () {
  return del('dist')
}


 exports.styles = styles;
 exports.images = images;
 exports.scripts = scripts;
 exports.watching = watching;
 exports.browsersync = browsersync;
 exports.cleanDist = cleanDist;
 exports.build = series(cleanDist, build, images) ;
 exports.fontsConverterFull = series(fontsConverter, fontsConverter2)
 exports.default = parallel(styles,scripts,watching, browsersync);