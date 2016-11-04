db.categories.insert([	
{
    "_id":"57ffea04263a1e9f4f2b9fa3",
    "name": "Front End Development"
},
{
    "_id":"57ffea04263a1e9f4f2b9fa4",
    "name": "Back End Development"
},
{
    "_id":"57ffea04263a1e9f4f2b9fa5",
    "name": "Database"
}
]);

db.tags.insert([
{
    "_id":"57ffea9a263a1e9f4f2bdd24",
    "name": "JavaScript"
},
{
    "_id":"57ffea9a263a1e9f4f2bdd25",
    "name": "Angular 2"
},
{
    "_id":"57ffea9a263a1e9f4f2bdd26",
    "name": "NodeJS"
},
{
    "_id":"57ffea9a263a1e9f4f2bdd27",
    "name": "ExpressJS"
}
]);

db.users.insert([
{
    "_id":"57ed4490259d3e00113b3837",
    "name":"Sandro Sanchez",
    "email":"sandropucp@gmail.com",
    "password":"password",
    "birthYear":1980
},
{
    "_id":"57ed44bc259d3e00113b3838",
    "name":"Anthony Ascencio",
    "email":"tony@gmail.com",
    "password":"password",
    "birthYear":1980
}
]);


db.stories.insert([
{
    "title":"React",
    "body":"React is a JavaScript library for creating user interfaces by Facebook and Instagram. Many people choose to think of React as the V in MVC.We built React to solve one problem: building large applications with data that changes over time.Simply express how your app should look at any given point in time, and React will automatically manage all UI updates when your underlying data changes.",
    "author":"57ed4490259d3e00113b3837",
    "category":"57ffea04263a1e9f4f2b9fa3",
    "comments": [
        {
            "author":"57ed44bc259d3e00113b3838",
            "body":"When the data changes, React conceptually hits the refresh button, and knows to only update the changed parts."
        },
        {
            "author":"57ed44bc259d3e00113b3838",
            "body":"React is all about building reusable components. In fact, with React the only thing you do is build components. Since they're so encapsulated, components make code reuse, testing, and separation of concerns easy."
        }
    ],    
    "tags":["57ffea9a263a1e9f4f2bdd24","57ffea9a263a1e9f4f2bdd25"]
},
{
    "title":"Angular 2",
    "body":"The ease, accessibility, and expressiveness in web development today is incredible. With the increasing size of web developers (at least in the US), scores of frameworks are being constantly released (sometimes it feels like daily). It can be difficult to pick the right web development framework for an app.",
    "author":"57ed4490259d3e00113b3837",
    "category":"57ffea04263a1e9f4f2b9fa3",
    "comments": [
        {
            "author":"57ed44bc259d3e00113b3838",
            "body":"The benefits of Angular 1.x are smatterd across the Internet. Although they are out of scope for this post (and honestly, a single Google search will answer better than I could), we’re going to focus on why Angular 2 matters and what it means for you and your team."
        }
    ],    
    "tags":["57ffea9a263a1e9f4f2bdd26"]
},
{
    "title":"Stored Procedures",
    "body":"React is a JavaScript library for creating user interfaces by Facebook and Instagram. Many people choose to think of React as the V in MVC.We built React to solve one problem: building large applications with data that changes over time.Simply express how your app should look at any given point in time, and React will automatically manage all UI updates when your underlying data changes.",
    "author":"57ed44bc259d3e00113b3838",
    "category":"57ffea04263a1e9f4f2b9fa5",
    "comments": [
        {
            "author":"57ed44bc259d3e00113b3838",
            "body":"When the data changes, React conceptually hits the refresh button, and knows to only update the changed parts."
        }
    ],    
    "tags":["57ffea9a263a1e9f4f2bdd25"]
}
]);
