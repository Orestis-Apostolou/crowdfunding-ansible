pipeline {
    agent any

    stages {
        stage('Run Backend Playbook') {
            steps {
                dir('ansible') {
                    sh 'ansible-playbook playbook/spring.yaml'
                }
            }
        }

        stage('Run Frontend Playbook') {
            steps {
                dir('ansible') {
                    sh 'ansible-playbook playbook/node.yaml'
                }
            }
        }
    }

}
