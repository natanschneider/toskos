pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'toskos'
        COMPOSE_FILE = 'docker-compose.yaml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Copy .env') {
            steps {
                sh 'cp /var/envs/toskos/.env .env'
            }
        }

        stage('Build and Start') {
            steps {
                script {
                    sh 'docker compose up --build -d'
                }
            }
        }

        stage('Verify') {
            steps {
                script {
                    sh 'docker compose ps'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        failure {
            sh 'docker compose logs'
        }
    }
}
