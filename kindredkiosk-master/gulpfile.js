const gulp = require('gulp');
// const changed = require('gulp-changed');
const filter = require('gulp-filter');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const { join } = require('path');

const folders = {
    audios: {
        src: join(__dirname, 'assets/audio'),
        dest: join(__dirname, 'dist/audio'),
        destAux: join(__dirname, '.tmp/audio'),
    },
    images: {
        src: join(__dirname, 'assets/img'),
        dest: join(__dirname, 'dist/img', 'compressed'),
        destAux: join(__dirname, '.tmp/img', 'compressed'),
    },
};

gulp.task('image:png', function() {
    return gulp.src(
        join(folders.images.src, '/**/*.png')
    )
        .pipe(imagemin(
            [imageminPngquant({ quality: [0.3, 0.7] })],
            {verbose: true}
        ))
        .pipe(gulp.dest(folders.images.dest))
});


gulp.task('image:jpeg', function() {
    return gulp.src(join(folders.images.src, '/**/*.{jpg,jpeg}'))
        .pipe(imagemin(
            [imageminJpegtran({ progressive: true })],
            {verbose: true}
        ))
        .pipe(gulp.dest(folders.images.dest));
});


gulp.task('image:svg', function() {
    return gulp.src(join(folders.images.src, '/**/*.svg'))
        // .pipe(imagemin(
        //     [imageminSvgo({
        //         plugins: [
        //             { removeViewBox: false }
        //         ]
        //     })],
        //     {verbose: true}
        // ))
        .pipe(gulp.dest(folders.images.dest));
});

gulp.task('image:webp', function() {
    const excludeFiles = [
        `${join(folders.images.src, '/mapa-new.png')}`
    ]
    return gulp.src([
            join(folders.images.src, '/**/*.{jpg,jpeg,png}'),
            ...excludeFiles.map(fileName => `!${fileName}`),
        ])
        .pipe(imagemin(
            [
                imageminWebp({
                    quality: 50,
                })
            ],
            { verbose: true }
        ))
        .pipe(gulp.dest(folders.images.dest))
        .pipe(gulp.src(excludeFiles))
        .pipe(imagemin(
            [
                imageminWebp({
                    quality: 90,
                })
            ],
            { verbose: true }
        ))
        .pipe(gulp.dest(folders.images.dest));
});

gulp.task('default', gulp.parallel('image:png', 'image:jpeg', 'image:svg'));
gulp.task('new-but-not-now', gulp.parallel('image:webp', 'image:svg'));
