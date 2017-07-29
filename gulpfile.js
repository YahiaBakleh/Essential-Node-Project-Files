/*jshint esversion: 6 */
const gulp= require('gulp');
const jshint= require('gulp-jshint');
const jscs= require('gulp-jscs');
const bowerJson = require('./bower.json');
const inject= require('gulp-inject');
const nodemon= require('gulp-nodemon');
const injectScr= 
		gulp.src([/*'*.js','*.css', add this 
                    will add server js and gulp.js and other 
                    js file in root*/
					'./public/css/*.css',
					'./public/js/*.js'
					],
					/*to not read all files in given src*/
				  	{read: false}
					);
const injectOption={ignorePath:'/public/'};
const wiredep= require('wiredep').stream;
const jsFile=['*.js','./views/**/*.js'];
const viewFile=['*.jade','*.hbs','./views/**/*.jade','./views/**/*.hbs'];
const views='./views';
const lib = './public/lib';
const port = process.env.port || 8080;

gulp.task('style', function() {
    gulp.src(jsFile)
    	.pipe(jshint())
    	.pipe(jshint.reporter('jshint-stylish',{
    		verbose: true
    	})).pipe(jscs());
});

gulp.task('inject', function() {
	var options ={bowerJson : bowerJson , directory : lib , ignorePath:'../../public/'};
    return gulp.src(viewFile)
    		   .pipe(wiredep(options))
    		   .pipe(inject(injectScr,injectOption))
    		   .pipe(gulp.dest(views));
});

gulp.task('serve',['style','inject'],function(){
    var options ={
            script: 'server.js',
            delayTime:1, 
            env: {PORT:port },
            /*nodemon will watch the given file  */
            /*if any cahnge happend will restart the server */
            /*to watch html or view fie and js file just add */ 
            /*[jsFile ,viewFile] */
            watch: jsFile
        } ;
        return nodemon(options).on(function (env) {
            console.log('restating ...');
        });
});