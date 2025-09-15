pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t weather-app .'
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop old container if running
                    sh 'docker stop weather-app || true && docker rm weather-app || true'

                    // Run new container
                    sh 'docker run -d --name weather-app -p 3030:80 weather-app'
                }
            }
        }

        stage('Test Container') {
            steps {
                script {
                    // Wait for container to start
                    sleep 10
                    
                    // Test if app is running and returning HTTP 200
                    sh '''
                        STATUS_CODE=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:8080)
                        if [ "$STATUS_CODE" -ne 200 ]; then
                          echo "App test failed with status code $STATUS_CODE"
                          exit 1
                        else
                          echo "App test passed with status code $STATUS_CODE"
                        fi
                    '''
                }
            }
        }
    }
}

