/*jshint esversion: 6 */
const Express= require('express');
const pug= require('pug');
const jade= require('jade');
const bodyParser= require('body-parser');
const async= require('async');
const hbs= require('hbs');
const path= require('path');
const App = new Express();
const Route = Express.Router();
const port = process.env.port || 8080;


App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
App.use('/',Route);
App.use(Express.static(path.join(__dirname , 'public')));	
App.set('view engine', 'hbs');  
App.set('views',path.join(__dirname,'views'));
App.get('/home' , (req,resp)=>{
	resp.render('home/index');
});
App.listen(port, (error)=>{
	//error?console.log(error):console.log(`server running on port : ${port}`);
	if (error) {
		console.log(error);
	} else {
		console.log(`server running on port : ${port}`);
	}
});