import fastify from 'fastify';



const start = async () => {
    const app =fastify();
    const Port = process.env.PORT || 3000;
    app.listen({port:Port , host:"0.0.0.0"},(err ,addr)=>{
        if(err) {
            console.error(err);

        }else{
            console.log(`Blink it start on http://localhost:${Port}`);
        }
    });
};

start();