const {Client } = require('pg');
const connectionString = 'postgresql://test:1234@localhost:5432/login';

const client = new Client({
	connectionString: connectionString
});
client.connect();

module.exports.select = function (email, password, res, req) { 
	const query = {
		text: 'SELECT * FROM data WHERE email = $1 AND password = $2;',
		values: [email, password]
	}
	
	if(!req.session.email){
		client.query(query, (err, res2) => {
		  if (err) {
			console.log(err.stack);
		  } else {
				if(res2.rowCount == 0){
					res.send("Login failed, try again");
				}
				else{
					req.session.email = email;
					res.send("Welcome " + req.session.email + " you can click the following link to destroy the session <a href='/logout'>Logout</a>")
				}
		  }
		});
	}
	else{
		res.send("You are already logged in");
	}
}

module.exports.insert = function (email, password, name, surname, res, req) {
	const query = {
		text: 'INSERT INTO data(email, password, name, surname) VALUES($1, $2, $3, $4) RETURNING *;',
		values: [email, password, name, surname]
	}
	
	if(!req.session.email){
		client.query(query, (err, res2) => {
		  if (err) {
			console.log(err.stack);
		  } else {
				res.send("Registration complete! Now you can <a href='/'>login</a> into your account");
		  }
		});
	}
	else{
		res.send("You have already got an account");
	}
}