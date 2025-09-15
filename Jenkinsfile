pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Arunkumar908090/weather-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t weather-app .'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop old container if running
                    sh 'docker stop weather-app || true && docker rm weather-app || true'
                    
                    // Run new one
                    sh 'docker run -d --name weather-app -p 8080:80 weather-app'
                }
            }
        }
    }
}

