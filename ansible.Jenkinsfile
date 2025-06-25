pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        stage('Run Backend Playbook') {
            steps {
                sh 'ansible-playbook ansible/playbook/spring.yaml -i ansible/inventory'
            }
        }

        stage('Run Frontend Playbook') {
            steps {
                sh 'ansible-playbook ansible/playbook/node.yaml -i ansible/inventory'
            }
        }
    }
}
