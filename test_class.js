
class Sport {

    constructor() {

    }

    print_r(message) {
        console.log(message);
        
    }

}

class Test extends Sport {
    
    constructor () {
        super();
        this.message = "Hi From Test Class";
        super.print_r(this.message);
    }

    setMessage(message) {
        this.message = message;
    }

    p() {
        this.print_r(this.message);
    }

    print_r(message) {
        console.log("Log from Test class. " + message);
    }
}

obj = new Test();
obj.setMessage('New message');
obj.print_r('mo');