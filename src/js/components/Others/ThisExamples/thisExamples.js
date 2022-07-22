function a() {

    console.log(this); // window object
}

class C {

    a() {

        console.log(this); // C object
    }
}

setTimeout(function () {

    console.log(this); // window object || "timers" class object
});


class D {

    first() {

        console.log('executing "first"... I will win');

        setTimeout(function () {
            this.second(); // undefined function "second"
        }, 500);
    }

    first_and_good() {

        console.log('executing "first_and_good"... You will win');

        let _this = this;

        setTimeout(function () {
            _this.second(); // undefined function "second"
        }, 500);

    }

    first_and_good_too() {

        console.log('executing "first_and_good"... You will win');


        setTimeout(() => {
            this.second(); // undefined function "second"
        }, 500);

    }


    second() {

        console.log('Ehhh, you finally are here! Good job');
    }
}