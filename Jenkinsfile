stage('Run Container') {
    steps {
        script {
            // Stop old container if running
            sh 'docker stop weather-app || true && docker rm weather-app || true'

            // Run new container on port 3030
            sh 'docker run -d --name weather-app -p 3030:80 weather-app'
        }
    }
}

stage('Test Container') {
    steps {
        script {
            // Wait for container to start
            sleep 15

            // Debug logs
            sh 'docker logs weather-app || true'

            // Test health on port 3030
            sh '''
                STATUS_CODE=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3030 || echo "000")
                if [ "$STATUS_CODE" -ne 200 ]; then
                  echo "❌ App test failed with status code $STATUS_CODE"
                  exit 1
                else
                  echo "✅ App test passed with status code $STATUS_CODE"

