var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var indata;

//TRUCK
var truckWheelBack = -120;
var truckWheelFront = -45;
var truckBack = -135;
var truckFront = -45;


function setup() {

  //TRUCK
  createCanvas(960, 540);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
 
}

function draw() {

    //TRUCK
    //SETTING SKY COLOR
    background(135, 226, 237);

    stroke(0);
    textSize(25);
    text("Truck speed: "+indata+" MPH", 20, 50 );

    //DRAWING GRASS
    stroke(0);
    fill(0, 219, 56);
    rect(0, 300, 960, 300);

    stroke(70, 243, 132);;
    line(20, 320, 20, 330);
    line(40, 320, 40, 330);
    line(60, 320, 60, 330);
    line(80, 320, 80, 330);
    line(100, 320, 100, 330);
    line(120, 320, 120, 330);
    line(140, 320, 140, 330);
    line(160, 320, 160, 330);
    line(180, 320, 180, 330);

    //DRAWING PAVEMENT
    stroke(0);
    fill(200);
    rect(0, 350, 960, 150);
    fill(250, 243, 37);
    rect(0, 420, 50, 10);
    rect(150, 420, 50, 10);
    rect(300, 420, 50, 10);
    rect(450, 420, 50, 10);
    rect(600, 420, 50, 10);
    rect(750, 420, 50, 10);
    rect(900, 420, 50, 10);

    //DRAW SUN
    fill(250, 243, 132);
    ellipse(800, 100, 80, 80);


    //DRAW CAR
    fill(0);
    ellipse(truckWheelBack, 465, 25, 25); // truckWheelBack
    ellipse(truckWheelFront, 465, 25, 25); // truckWheelFront
    fill(255, 0, 0);
    rect(truckBack, 385, 100, 75); // truckBack
    rect(truckFront, 420, 40, 40); // truckFront
 
}


function serialEvent() {
    indata = serial.readStringUntil("\r\n"); //read bytes

    if(indata == "hello"){
      serial.write("x")
    }

    if(indata !== "hello"){
    indata = trim(indata);
    indata = Number(indata);
    console.log("Received data: " + indata);
  }

    if(indata > 0){
      truckWheelBack+=(indata/100);
      truckWheelFront+=(indata/100);
      truckFront+=(indata/100);
      truckBack+=(indata/100);
    }
}

function mousePressed(){
  serial.write(1);
  console.log("1");
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}