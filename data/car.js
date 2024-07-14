class Car{
      brand;
      model;
      constructor(productDetails){
            this.brand = productDetails.brand;
            this.model = productDetails.model;
      }

      displayInfo(){
            console.log(`${this.brand},${this.model}`);
            
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