module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    })//configuração inicial do grunt

    //criação de tarefas com grunt

    grunt.registerTask('olaGrunt', function(){
        const done = this.async(); // para que o grunt espere a finalização da tarefa
        setTimeout(function(){
            console.log('ola Grunt!')
            done()//so encerra o grunt apos a finalização da tarefa
        }, 3000);
        
        //para criar a tarefa os argumentos sera primeiro o nome da tarefa e depois a função da tarefa.
    });

    grunt.registerTask('default', ['olaGrunt']); // tarefa default
    //pode se passar varias tarefas a serem executadas dentro do array.
}