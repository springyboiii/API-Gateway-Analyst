class Constant:
    def getRoles():
        roles = {
            "admin": "ADMIN",
            "user": "USER"
        }
        return roles
    
    def getAnomalyTypes(): 
        anomalyTypes = {
            0: "Not an anomaly",
            1: "Anomaly detected (Due to: High CPU usage due to mediation)",
            2: "Anomaly detected (Due to: High Memory usage due to mediation)",
            3: "Anomaly detected (Due to: High disk I/O due to mediation)",
            4: "Anomaly detected (Due to: Increased load (numbers of users))",
            5: "Anomaly detected (Due to: Increased load (throughput))",
            6: "Anomaly detected (Due to: Long response time in back-end services)",
            7: "Anomaly detected (Due to: Increased message size)",
            8: "Anomaly detected (Due to: Failure in back-end services)",
            9: "Anomaly detected (Due to: Increased load (throughput))",
            10: "Anomaly detected (Due to: Increased message size)",
        }
        return anomalyTypes