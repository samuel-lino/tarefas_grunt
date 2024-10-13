
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
            },
            html:{
                files:['./src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace:{ //usado para substituir palavras
            dev:{
                options: {
                    patterns:[
                        {
                            match: 'ENDEREÇO_DO_CSS',//palavras que ele ira procurar, no html tem que colocar @@ antes destas palavras.
                            replacement: './styles/main.css'//o que ira substituir
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',//palavras que ele ira procurar, no html tem que colocar @@ antes destas palavras.
                            replacement: '../src/scripts/main.js'//o que ira substituir
                        }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src:['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:{
                options: {
                    patterns:[
                        {
                            match: 'ENDEREÇO_DO_CSS',//palavras que ele ira procurar, no html tem que colocar @@ antes destas palavras.
                            replacement: './styles/main.min.css'//o que ira substituir
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',//palavras que ele ira procurar, no html tem que colocar @@ antes destas palavras.
                            replacement: './scripts/main.min.js'//o que ira substituir
                        }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src:['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
            
        },
        htmlmin:{
            dist:{//minifica o html
                options:{
                    removeComments: true,//remove os comentarios
                    collapseWhitespace: true//remove os espaços vazios
                },
                files: {//foi criada uma pasta temporaria para depois mudar o endereço do css, primeiro o destino e segigundo a fonte
                    'prebuild/index.html':'src/index.html'
                }
            }
        },
        clean:['prebuild'],//limpa a pasta temporaria
        uglify:{
            target:{
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
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
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']); // tarefa default
    //pode se passar varias tarefas a serem executadas dentro do array.
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify'])
}