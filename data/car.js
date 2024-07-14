class Car{
      #brand;
      #model;
      speed=0;
      isTrunkOpen = false;

      constructor(productDetails){
            this.#brand = productDetails.brand;
            this.#model = productDetails.model;
      }

      displayInfo(){
            const trunkStatus = this.isTrunkOpen ? 'open' : 'closed'
            console.log(`${this.#brand},${this.#model}, speed: ${this.speed} km/h, trunk:${trunkStatus}`);
            
      }
      go(){
            if(!this.isTrunkOpen){
                  this.speed += 5 ;
            }
            if(this.speed >200){
                  this.speed = 200;
            }
      }
      brake(){
             this.speed -= 5;
             if(this.speed < 0 ){
                  this.speed = 0;
             }
      }

      openTrunk(){
            if(this.speed === 0){
            this.isTrunkOpen = true;
            }
      }

      closeTrunk(){
            this.isTrunkOpen = false;
      }

}

class RaceCar extends Car{
      acceleration;

      constructor(carDetails){
            super(carDetails);
            this.acceleration = carDetails.acceleration;
      }

      go(){
            
                  this.speed += this.acceleration;
            
            if(this.speed>300){
                  this.speed = 300;
            }
      }

      openTrunk(){
            console.log('racecar does not have a trunk');
      }


      closeTrunk(){
            console.log('racecar does not have a trunk');
      }
}

const car1 = new Car({
      brand: 'Toyota',
      model: 'Corolla'
});

const car2 = new Car({
      brand: 'Telsa',
      model: 'Model3'
 })

 console.log(car1);
 console.log(car2);

 car1.openTrunk();
 car1.displayInfo();
 
 car1.go();
 car1.closeTrunk();
 car1.go();
 car1.go();
 car1.displayInfo();
 car1.brake();
 car1.displayInfo();

 car2.displayInfo();
 car2.go();
 car2.go();
 car2.displayInfo();
 car2.brake();
 car2.displayInfo();

 const raceCar = new RaceCar({
      brand: 'McLaren',
      model: 'F1',
      acceleration: 20
 });

 raceCar.go();
 raceCar.go();
 raceCar.go();
 raceCar.displayInfo();
 raceCar.openTrunk();
 raceCar.displayInfo();
 raceCar.brake();
 raceCar.displayInfo();