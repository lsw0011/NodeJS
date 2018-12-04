var prime = 1;
var currentNum = 3;
var divisor;
var isPrime;
var primes = [2]
while(prime < 10001){
    divisor = 3;
    isPrime = true;
    primes.forEach(divisor => {
        if(currentNum%divisor == 0){
            isPrime = false
            return;
        }
    })
    if(isPrime){
        prime+=1
    }
    primes.push(currentNum)
    currentNum += 2;
}
console.log(currentNum-2)