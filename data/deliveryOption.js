import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
export function getDeliveryOption(deliveryOptionId){
      let deliveryOption;

      deliveryOptions.forEach((option)=>{
           if(option.id === deliveryOptionId){
            deliveryOption = option;
           }
      });
      return deliveryOption || deliveryOptions[0];

}

export function validDeliveryOption(deliveryOptionId){
      let found = false;
      deliveryOptions.forEach((option)=>{
            if(option.id === deliveryOptionId){
                  found = true;
            }

      });
      return found;
}

function isWeekend(date){
      const dayOfWeek = date.format('dddd');
      return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption){
   
      let deliveryDate = dayjs();
      let remainDate = deliveryOption.deliveryDays;

      while(remainDate>0){
            deliveryDate=deliveryDate.add(1,'day');
           if ( !isWeekend(deliveryDate)){
            
            remainDate--;

            }
      }

      const dateString =deliveryDate.format('dddd, MMMM D');
      return dateString;
}

export const deliveryOptions =[
      {
            id:'1',
            deliveryDays:7,
            priceCents:0

      },
      {
            id:'2',
            deliveryDays:3,
            priceCents:499
     
      },
      {
            id:'3',
            deliveryDays:1,
            priceCents:999
     
      }
];

