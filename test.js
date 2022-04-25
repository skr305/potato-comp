const boot = () => {
    const obj = {
        name: 233
    };
    const { name: dog, name: cat } = obj;
    console.log( dog, cat )
};
boot();