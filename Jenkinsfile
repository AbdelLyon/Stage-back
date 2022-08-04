pipeline {
         agent any
     environment {
              BUILD_TAG = "backend_astech-prod:1.0.1"
    }
    stages {
        stage('Down previous') {   
           steps {
                sh "docker-compose down"
           }
        }
        stage('Deploy') {
       
           steps {
                sh "docker-compose up --build -d"
           }
        }
    
    }
}