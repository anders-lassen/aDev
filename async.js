// doSomething()
// .then((response) => doSomethingElse(response))
// .then((secondResponse) => doAThirdThing(secondResponse));

// function doSomething(){
//     console.log("doSomething")        
//     for (let i = 0; i < 100; i++) {
//         console.log(i)        
//     }
//     return true
// }

// function doSomethingElse(response){
//     console.log("doSomethingElse")
//     console.log(response)        
//     return true;
// }

// function doAThirdThing(response){
//     console.log("doAThirdThing")
//     console.log(response)        
//     return true;
// }

function first(cb) {
    setTimeout(function() {
        return cb('first');
    }, 0);
}

function second(cb) {
    for (let i = 0; i < 100; i++) {
        console.log(i)
    }
    return cb('second');
}
 
function third(cb) {
    return cb('third');
}
 
first(function(result1) {
    console.log(result1);
    third(function(result2) {
        console.log(result2);
        second(function(result3) {
            console.log(result3);
        });
    });
});