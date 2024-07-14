class Car{
      brand;
      model;
      speed=0;
      constructor(productDetails){
            this.brand = productDetails.brand;
            this.model = productDetails.model;
      }

      displayInfo(){
            console.log(`${this.brand},${this.model}, speed: ${this.speed} km/h`);
            
      }
      go(){
            this.speed += 5 ;
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
 car1.displayInfo();
 car2.displayInfo();
 car1.go();
 car1.go();
 car1.go();
 car1.displayInfo();
 car1.brake();
 car1.displayInfo();
 car2.go();
 car2.go();

 car2.displayInfo();
 car2.brake();
 car2.displayInfo();
