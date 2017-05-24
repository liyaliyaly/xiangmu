/**
 * Created by Administrator on 2017/5/19 0019.
 */
const gulp = require('gulp');
const webserver = require('gulp-webserver');//web服务热启动
var url = require('url');
var datajson = require('./data/data.js');

gulp.task('work', function () {
    gulp.src('./src')
        .pipe(webserver({
            port: 90,
            livereload: true,
            directoryListing: true,
            middleware: function (res, req, next) {
                const reqPath = url.parse(res.url).pathname;
                const routes = iphonedata.data();
                routes.forEach(function (i) {
                    console.log(i.route);
                    console.log(reqPath);
                    if (i.route == reqPath) {
                        i.handle(req, res, next)
                    }
                });
                next()
            },
            open: "html/index.html"
        }));
});