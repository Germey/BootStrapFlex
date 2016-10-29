import gulp       from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
const source = ['sass/**/*.scss'];
const dest = 'dist/css/';

gulp.task('sass', () => {
    return gulp.src(source)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true,
        remove: true
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', ['sass', 'watch'])

gulp.task('watch', () => {
    gulp.watch(source, ['sass']);
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});