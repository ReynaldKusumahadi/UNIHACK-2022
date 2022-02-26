const db = require('gun')();
const car = db.get("123").put({
    make: "Toyota",
    model: "Camry",
});
car.once(v => console.log(v.make));
