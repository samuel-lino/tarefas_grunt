module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),//configuração inicial do grunt
        less: {
            development: {//versão de desenvolvimento
                files: {
                    './dev/styles/main.css': './src/styles/main.less'
                }
            },

            production: {//versão de produção
                options:{
                    compress: true,//comprimi o arquivo
                },
                files:{
                    './dist/styles/main.min.css': './src/styles/main.less'
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
        },
        concurrent:{//executa as tarefas de forma paralela.
            target: ['less']
        },
        watch:{//observa alteraçoes.
            less:{
                files:['./src/styles/**/*.less'],
                tasks: ['less:development']//executa a tarefa apos alterações.
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
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']); // tarefa default
    //pode se passar varias tarefas a serem executadas dentro do array.
    grunt.registerTask('build', 'less:production')
}