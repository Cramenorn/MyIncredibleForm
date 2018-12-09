# MyIncredibleForm
I made a form using node.js as backend language and postgresql for the database. I also used a node.js library called **node-postgres**.

# What should i do to make the website work ?

* Clone this repository https://github.com/Cramenorn/MyIncredibleForm.git
* Open the terminal to your project location, type **npm install** to get the needed packages for the project.
* Create one database in **postgresql** and name it **login** then create a table named **data** with the following four columns: name, surname, email and password. The last thing you need to do is create a user called **test** with the following password **1234**. If you want create your own user and your own database just change the connection string in **queries.js** and you are good to go. Remember to change the table name in queries.js in **insert** and **select** modules.
* Type **npm test** and you are good to go.

# Built with
* [Postgresql](https://www.postgresql.org/)
* [Node-postgres](https://node-postgres.com/)
* [Node js](https://nodejs.org/en/)