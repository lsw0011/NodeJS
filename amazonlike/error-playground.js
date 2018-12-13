const sum = (a, b) => {
    if (a && b) {
        return a + b;
    }
    throw new Error('Invalid Arguments')
};

sum(1)

try {
    console.log(sum(a))  
} catch (e) {
    console.log('Error occurred!');
} finally {
    console.log('Fuck')
}
