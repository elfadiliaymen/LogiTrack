const prompt = require('prompt-sync')();


let Taxis = [ 
{ id: 1, position: 5, available: true, timeRemaining: 11, totalRides: 
0 }, 
{ id: 2, position: 12, available: true, timeRemaining: 5, 
totalRides: 0 }, 
{ id: 3, position: 20, available: true, timeRemaining: 6, 
totalRides: 0 } ,
] ;

let Requests = [ 
{ reqId: 1, position: 10, duration: 3, time: 0 }, 
{ reqId: 2, position: 3, duration: 4, time: 2 }, 
{ reqId: 3, position: 18, duration: 2, time: 4 }, 
{ reqId: 4, position: 7, duration: 5, time: 5 } 
] ;

let waitingQueue = [];





function prochTaxi(taxi , reqp , request  ){
    let distances = [];
    let d;
    let taxip = [];
    

    for(let t = 0 ; t<taxi.length; t++){

           if(taxi[t].available == true ){  

             for(let i = 0 ; i<taxi.length ; i++){

              if( taxi[i].position > reqp ){
              d = taxi[i].position - reqp;
              distances.push(d);
           }else{
                d = reqp - taxi[i].position;
                  distances.push(d);
             }
           }
           
           let min = Math.min(...distances);

           for(let i = 0 ; i<taxi.length ; i++){
                if(taxi[i].position == reqp + min ){
                   taxi[i].available = false ;
                  
                   taxip.push(taxi[i]);
                }
           }
            gererTrajet(taxi , reqp);
           break;     
        } else{
         waiting(request , reqp);
          break;
        }
     }
       
    }
       
function gererTrajet(taxi ,  reqp){
  let requestduration;

   for(let i = 0 ; i<taxi.length; i++){

     if(taxi[i].available == false){
         console.log(`Taxi ${taxi[i].id} est en route vers le client`);

         let value = taxi[i].position;
         let time = taxi[i].timeRemaining;
         let decrement = 1;
        
         for(let j = 0 ; j<Requests.length; j++){
             if(Requests[j].position == reqp){
                  requestduration = Requests[j].duration;
             }
         }

         arrivée(taxi[i] , requestduration );

        function decreaseAnimation() {
        var interval = setInterval(() => {
          if(taxi[i].position > reqp){
               value = value - decrement;
          }else{
            value = value - decrement;
          }

          if(taxi[i].timeRemaining > 0){
              time = time - decrement;
          }
        console.log( `Temps restant : ${time} min.`);
        console.log( ` => Position initiale du taxi ${taxi[i].id} : ${value} min.`);
         taxi[i].position = value;

         console.log( ` => Position actuelle du taxi : ${taxi[i].position}`);
         console.log( ` Temps restant : ${time}`);

          if (taxi[i].position === reqp || 
            (value <= reqp && taxi[i].position < reqp)) {
          console.log(` => Taxi ${taxi[i].id} est arrivé chez le client`);
         clearInterval(interval);
         }
  }, 1000);

     }

     decreaseAnimation();
  }
}
}

function waiting(request){
  if(request){
     let newReq = { reqId: request.id,
       position: request.position,
        duration: request.duration,
         time: request.time };
         waitingQueue.push(newReq);
         console.log("ajoutee a file d attente");
        
  }
      
}


function arrivée(taxi , durationA){

  let value = durationA;
  let decrement = 1;
     
  function decreaseAnimation() {
        let interval = setInterval(() => {
        value = value - decrement;
         console.log( `Durée restante du trajet : ${value} min`);
         if (value <= 0) {
          console.log(` => Taxi ${taxi.id} a terminé la course`);
          taxi.available = true;
          taxi.totalRides++;
         clearInterval(interval);
         }
  }, 1000);

     }
     decreaseAnimation();
}


function request(){
//   if(fileattente.length > 0){
//   for(let j= 0 ; j<taxi.length ; j++){
//   if(taxi[j].available == true){
//      for(let i=0 ; i<fileattente.length ; i++){
//       Requests.unshift(fileattente[i]);
//      }
//      }
//   }
  
// }else {

  

     let position = Number(prompt("entrez votre position :"));
     let durationDetrajit = Number( prompt("entrez  duree De trajit :"));

     if(position &&  durationDetrajit ){
         let request = { reqId: Requests.length + 1,
           position: position,
           duration: durationDetrajit,
           time: 5 };

          Requests.push(request);

          prochTaxi(Taxis , position , request );

          console.log("Nouvelle requête ajoutée ");

     }
     }

    function statistique(taxi){
      for(let i = 0 ; i<taxi.length ; i++){
          console.log("Nombre de trajets effectués : " + taxi[i].totalRides );
           console.log("Position finale : " + taxi[i].position );
         
      }
    }


request();


