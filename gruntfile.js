module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),//configuração inicial do grunt
        less: {
            development: {//versão de desenvolvimento
                files: {
                    './build/styles/main.css': './src/styles/main.less'
                }
            },

            production: {//versão de produção
                options:{
                    compress: true,//comprimi o arquivo
                },
                files:{
                    './build/styles/main.min.css': './src/styles/main.less'
                }
            }
        },

        sass:{
            dist:{
                options:{
                    style: 'compressed'//comprime o sass
                },
                files:{
                    'main2.css': 'main.scss'
                }
            }
        }
    })

    //criação de tarefas com grunt

    grunt.registerTask('olaGrunt', function(){
        const done = this.async(); // para que o grunt espere a finalização da tarefa
        setTimeout(function(){
            console.log('ola Grunt!')
            done()//so encerra o grunt apos a finalização da tarefa
        }, 3000);
        
        //para criar a tarefa os argumentos sera primeiro o nome da tarefa e depois a função da tarefa.
    });

    //nescessario para ler o plugin
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['less', 'sass']); // tarefa default
    //pode se passar varias tarefas a serem executadas dentro do array.
}