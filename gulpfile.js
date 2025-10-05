const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const connect = require("gulp-connect");

const paths = {
  html: {
    all: "src/page/**/*.html",
  },
  image: {
    all: "src/assets/**",
  },
  styles: {
    all: "src/styles/**/*.scss",
    main: "src/styles/main.scss",
  },
  scripts: {
    all: "src/scripts/**/*.js",
    app: "src/scripts/app.js",
  },
  fonts: {
    all: "src/fonts/**",
  },
  output: "dist",
};

// Servidor local com live reload
function server() {
  connect.server({
    root: paths.output,
    livereload: true,
    port: 3000,
  });
}

// Vigia mudanças
function sentinel() {
  watch(paths.html.all, { ignoreInitial: false }, html);
  watch(paths.image.all, { ignoreInitial: false }, image);
  watch(paths.styles.all, { ignoreInitial: false }, styles);
  watch(paths.scripts.all, { ignoreInitial: false }, scripts);
  watch(paths.fonts.all, { ignoreInitial: false }, fonts);
}

// Tarefas
function html() {
  return src(paths.html.all).pipe(dest(paths.output)).pipe(connect.reload());
}

function image() {
  return src(paths.image.all)
    .pipe(dest(`${paths.output}/assets`))
    .pipe(connect.reload());
}

function fonts() {
  return src(paths.fonts.all)
    .pipe(dest(`${paths.output}/fonts`))
    .pipe(connect.reload());
}

function styles() {
  return src(paths.styles.main)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest(`${paths.output}/css`)) // jogar em uma pasta css (boa prática)
    .pipe(connect.reload());
}

function scripts() {
  return browserify(paths.scripts.app)
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
      })
    )
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest(`${paths.output}/js`)) // jogar em pasta js
    .pipe(connect.reload());
}

exports.default = parallel(server, sentinel);
